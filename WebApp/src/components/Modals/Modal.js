import PropTypes from "prop-types";

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'

import { setUploadFile } from '../../redux/uploadFile/uploadFile.actions'

import DatiImmagini from '../immagini/DatiImmagini'

class ModalForm extends Component {
  constructor(props) {
    super(props)

    const { item } = this.props
    let id = null
    if (item) {
      id = item.id
    }

    this.state = {
      modal: false,
      id
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  setItemId = (id) => {
    this.setState({ id })
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

    const label = this.props.buttonLabel

    let button = ''
    let title = ''

    if (label === 'Edit') {
      button = <Button
        color="warning"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>{label}
      </Button>
      title = 'Edit Item'
    } else {
      button = <Button
        color="success"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>{label}
      </Button>
      title = 'Add New Item'
    }

    const handleAttachFIle = e => {
      // could do some validation for the attached file here
      this.props.setUploadFile(e.target.files)
      e.target.value = '' // to clear the current file
    }

    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl" backdrop="false" backdrop="false">
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              location={document.location}
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              //onFailure={this.props.onFailure}
              toggle={this.toggle}
              setItemId={this.setItemId}
              item={this.props.item} />
            {this.state.id != null ? (
              <>
                <form className="d-flex justify-content-around">
                  <div className="form-group">
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" multiple onChange={handleAttachFIle} />
                  </div>
                </form>
                <DatiImmagini id={this.state.id} />
              </>
            ) : (
                <span>Devi prima salvare per caricare le immagini</span>
              )}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Modal.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setUploadFile: files => dispatch(setUploadFile(files)),
  //onFailure: err => dispatch(onFailure(err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)