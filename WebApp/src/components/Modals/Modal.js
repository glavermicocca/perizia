import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'

import UploadProgress from '../UploadProgress/UploadProgress'
import { setUploadFile } from '../../redux/uploadFile/uploadFile.actions'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item} />
            <input type="file" multiple onChange={handleAttachFIle} />
            <UploadProgress />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUploadFile: files => dispatch(setUploadFile(files)),
})

export default connect(null, mapDispatchToProps)(ModalForm)