import PropTypes from "prop-types";

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Table } from 'reactstrap'
import { dati } from '../../actions/immagini'

class DatiImmagini extends Component {

  getItems() {
    console.log(this.props.id)
    this.props.dispatch(dati(this.props.id))
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      fetch('/immagini', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
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

  componentDidMount() {
    this.getItems()
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.file_name}</td>
          <td style={{ width: "75px" }}>
            <div>
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>filename</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

DatiImmagini.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

DatiImmagini.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { immagini } = state;
  return {
    items: immagini.items
  };
}

export default connect(mapStateToProps)(DatiImmagini);