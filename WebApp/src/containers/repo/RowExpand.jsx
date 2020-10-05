import React, { useEffect, useState } from "react";

import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

import QRCode from "qrcode.react";

import DataTableErroriDiConiazione from "./DataTableErroriDiConiazione"

import { baseURL } from '../../actions/action-types'

export const RowExpanded = (props) => {

  const { row, clickEliminaRow } = props

  const [file, selectFile] = useState(null)
  const [listFiles, setListFiles] = useState([])

  const onChangeHandler = event => {
    console.log(event.target.files[0])
    selectFile({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  const onClickHandler = async () => {

    if (file == null) {
      window.alert('Errore caricamento immagina... Seleziona un file differente e riprova...')
      return
    }

    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`,
      id: row.id
    };
    try {
      const data = new FormData()
      data.append('file', file.selectedFile)

      const response = await axios({
        baseURL,
        url: "/upload_file",
        method: "post",
        headers,
        data,
      });
      let dataResponse = response.data;

      selectFile(null)

      if (dataResponse.length > 0) {
        setListFiles([...listFiles, dataResponse[0]])
      } else {
        window.alert('Nessun file caricato...', dataResponse)
      }
    } catch (error) {
      selectFile(null)
      console.error(error);
    }
  }

  const getData = async (row) => {
    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`
    };
    try {
      const response = await axios({
        baseURL,
        url: `/crud_immagini?id=${row.id}`,
        method: "get",
        headers,
      });
      let dataResponse = response.data;
      if (dataResponse) {
        setListFiles(dataResponse)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteFile = async (filename) => {
    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`
    };
    try {
      const response = await axios({
        baseURL,
        url: `/crud_immagini`,
        method: "delete",
        headers,
        data: { filename }
      });
      let dataResponse = response.data;
      console.log(dataResponse);
      if (dataResponse.delete == true) {
        //TODO
        var copiedList = listFiles.filter((item) => {
          if (item.filename == filename) {
            return false
          } else {
            return true
          }
        })
        setListFiles(copiedList)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(row)
    getData(row)
  }, [])

  const GeneratorQrCode = (row) => {
    return <QRCode size={330} bgColor={"#fffbf5"} id={`qr_${row.id}`} style={{ width: 120, height: 120 }} value={'p.erroridiconiazione.com/' + row.stato + "/" + row.anno + "/" + row.valore + "/" + row.uuid} />
  }

  return (
    <div>
      <div className="card border-primary mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
        <div className="card-header">QrCode</div>
        <div className="card-body text-primary">
          <h5 className="card-title"><a target="_blank" href={row.stato + "/" + row.anno + "/" + row.valore + "/" + row.uuid}>{row.stato + "/" + row.anno + "/" + row.valore + "/" + row.uuid}</a></h5>
          <GeneratorQrCode />
          <br />
          <button type="button"
            className={`btn btn-danger`}
            data-toggle="button" onClick={(e) => {
              if (window.confirm("Sei sicuro di voler eliminare questa riga?")) {
                clickEliminaRow(row.id)
              }
            }}>Elimina Riga</button>
        </div>
      </div>
      <div className="card border-primary mb-3 mx-auto" style={{}}>
        <div className="card-header">Immagini</div>
        <div className="card-body text-primary">
          <div className="list-group">
            {listFiles.map((immagine, index) => {
              return <a key={index} className="list-group-item list-group-item-action flex-column align-items-start">
                <img src={'/static/' + immagine.filename} style={{ width: "100px", height: "auto" }} />
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">{immagine.originalname}</h6>
                  <button type="button"
                    className={`btn btn-danger`}
                    data-toggle="button" onClick={(e) => {
                      if (window.confirm("Sei sicuro di voler eliminare questa immagine???")) {
                        deleteFile(immagine.filename)
                      }
                    }}>Elimina Immagine</button>
                </div>
              </a>
            })}
          </div>
          <div className="mx-auto m-2" style={{ maxWidth: "400px" }}>
            <input type="file" name="file" onChange={onChangeHandler} />
            <button type="button" className="btn btn-success" onClick={onClickHandler}>Carica</button>
          </div>
        </div>
      </div>
      <DataTableErroriDiConiazione row={props.row} />
    </div>
  )
}
