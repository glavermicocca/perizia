import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'reactstrap'
import { dati, datiSuccess } from '../../actions/immagini'

import UploadProgress from '../UploadProgress/UploadProgress'

import {
  loadIdToken,
} from "../../utils/apiUtils";

class DatiImmagini extends Component {

  getItems() {
    this.props.datiLoad(this.props.id)
  }

  deleteItem = filename => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      const idToken = loadIdToken();
      fetch('/endpoint/crud_immagini', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ filename })
      })
        .then(response => response.json())
        .then(file => {
          const newArray = this.props.items.filter(item => item.filename !== filename)
          this.props.datiSuccess(newArray)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    const itemComponent = this.props.items.map(item => {
      return (
        <tr key={item.filename}>
          <td>{item.originalname}</td>
          <td style={{ width: "75px" }}>
            <div>
              <Button color="danger" onClick={() => this.deleteItem(item.filename)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <>
        <UploadProgress id={this.props.id} notify={() => {
          this.getItems()
        }} />
        <Table responsive hover>
          <thead>
            <tr>
              <th>filename</th>
            </tr>
          </thead>
          <tbody>
            {itemComponent}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = state => {
  const { immagini } = state;
  const { UploadFile } = state
  console.log(state)
  return {
    items: immagini.items
  };
}

const mapDispatchToProps = dispatch => {
  return {
    datiSuccess: (items) => { dispatch(datiSuccess(items)) },
    datiLoad: (id) => { dispatch(dati(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatiImmagini);