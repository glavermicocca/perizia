import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export function AreaCopy(props) {
  const { columns, confirmedColumns } = props

  let copyColumns = columns.map(it => {
    return Object.assign({}, it)
  })

  //set default checked for Andrea
  copyColumns.forEach(item => {
    if (item.dataField != 'stato' && item.dataField != 'orientamento_asse' && item.dataField != 'spessore' && item.dataField != 'valuta' && item.dataField != 'zecca') {
      item.checked = false
    } else {
      item.checked = true
    }
  })

  const [listChecked, setListChecked] = useState(copyColumns)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleConfirm = items => {
    setShow(false)
    let copyColumnsConfirmed = listChecked.filter(it => it.checked == true)
    confirmedColumns(copyColumnsConfirmed)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Duplica riga selezionata
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Duplicazione riga</Modal.Title>
        </Modal.Header>
        <Modal.Body>{makeListOfButton(listChecked, setListChecked)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Duplica
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const makeListOfButton = (checked, setChecked) => {
  return checked.map((item, index) => {
    if (item.dataField != 'qrcode' && item.dataField != 'id' && item.dataField != 'added') {
      return (
        <Button
          key={item.dataField}
          className="m-1"
          type="checkbox"
          variant={item.checked == true ? 'secondary' : 'light'}
          checked={item.checked}
          value="1"
          onClick={e => {
            //console.log(index)
            let newChecked = [...checked]
            newChecked[index].checked = !newChecked[index].checked
            setChecked(newChecked)
          }}>
          {item.text}
        </Button>
      )
    }
  })
}
