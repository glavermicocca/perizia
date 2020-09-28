import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

import QRCode from "qrcode.react";

export const RowExpanded = (props) => {

  const { row } = props

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

    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`,
      id: row.id
    };
    try {
      const data = new FormData()
      data.append('file', file.selectedFile)

      const response = await axios({
        baseURL: "http://localhost:3000",
        url: "/upload_file",
        method: "post",
        headers,
        data,
      });
      let dataResponse = response.data;

      console.log("qui...", dataResponse);
      selectFile(null)
      if (dataResponse.length > 0) {
        setListFiles([...listFiles, dataResponse[0]])
      } else {
        window.alert('Nessun file caricato...', dataResponse)
      }
    } catch (error) {
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
        baseURL: "http://localhost:3000",
        url: `/crud_immagini?id=${row.id}`,
        method: "get",
        headers,
      });
      let dataResponse = response.data;
      console.log(dataResponse);
      if (dataResponse) {
        //TODO
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
        baseURL: "http://localhost:3000",
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
        setListFiles(copiedList)n
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("use")
    getData(row)
  }, [])

  return (
    <div>
      {row.id}{" "}
      <QRCode level="L" value={row.id + "/" + row.stato + "/" + row.anno} />
      {listFiles.map((item, index) => {
        return <div key={index}><p>{item.originalname}
          <button type="button"
            className={`btn btn-danger`}
            data-toggle="button" onClick={(e) => {
              if (window.confirm("Do you want to delete?")) {
                deleteFile(item.filename)
              }
            }}>Elimina</button>
        </p></div>
      })}
      <button type="button"
        className={`btn btn-danger`}
        data-toggle="button" onClick={(e) => {
          if (window.confirm("Do you want to delete?")) {
            this.props.clickElimina(row.id)
          }
        }}>Elimina</button>
      <input type="file" name="file" onChange={onChangeHandler} />
      <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
    </div>
  )
}
