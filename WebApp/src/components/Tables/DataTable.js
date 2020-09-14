import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

import {
  loadIdToken,
} from "../../utils/apiUtils";

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      const idToken = loadIdToken();
      fetch('/crud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ id })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id)
        })
        .catch(err => {
          this.props.onFailure(err)
          console.log(err)
        })
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.stato}</td>
          <td>{item.anno}</td>
          <td>{item.valore}</td>
          <td>{item.uuid}</td>
          <td style={{ width: "240px" }}>
            <div>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} onFailure={this.props.onFailure} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
              {' '}
              <Button color="primary" onClick={() => {
                window.open(item.stato + '/' + item.anno + '/' + item.valore + '/' + item.uuid, '', "width=450,height=auto")
              }}>link 🔗</Button>
            </div>
          </td>
        </tr >
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stato</th>
            <th>Anno</th>
            <th>Valore</th>
            <th>uuid</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table >
    )
  }
}

export default DataTable