import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../../components/Modals/Modal'
import DataTable from '../../components/Tables/DataTable'
import { CSVLink } from "react-csv"
import { dati, datiRequest, datiSuccess, datiFailure } from '../../actions/crud'

import PropTypes from "prop-types";

import { connect } from "react-redux";

class Dati extends Component {

  getItems() {
    this.props.dispatch(dati());
  }

  addItemToState = (item) => {
    const newArray = [...this.props.items, item]
    this.props.dispatch(datiSuccess(newArray))
  }

  updateState = (item) => {
    const itemIndex = this.props.items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.props.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.props.items.slice(itemIndex + 1)
    ]

    this.props.dispatch(datiSuccess(newArray))
  }

  deleteItemFromState = (id) => {
    const newArray = this.props.items.filter(item => item.id !== id)

    this.props.dispatch(datiSuccess(newArray))
  }

  onFailure = (error) => {
    this.props.dispatch(datiFailure(error))
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <DataTable items={this.props.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} onFailure={this.onFailure} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.props.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
          </Col>
        </Row>
      </Container>
    )
  }
}

Dati.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

Dati.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { crud } = state;
  return {
    items: crud.items
  };
};

export default connect(mapStateToProps)(Dati);