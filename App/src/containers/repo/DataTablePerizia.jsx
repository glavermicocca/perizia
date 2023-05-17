import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import { RowExpanded } from './RowExpand'

import { ModalAreaCopy } from './AreaCopy'

import axios from 'axios'
import React from 'react'

import { loadIdToken } from '../../utils/apiUtils'

import { PDFViewer } from '@react-pdf/renderer'

import Cartellini from './Cartellini'

import QRCode from 'qrcode.react'

import { Form } from 'react-bootstrap'

const baseURL = process.env.REACT_APP_BASE_PATH

class QualityRanger extends React.Component {
  getValue() {
    return this.props.value == 1 ? 0 : 1
  }
  p = this.props
  debugger
  render() {
    return (
      <>
        <input
          id="flexSwitchCheckDefault"
          className="btn-check"
          type="checkbox"
          checked={this.props.value}
          defaultChecked={this.props.defaultChecked}
          //value={this.props.value || this.props.defaultValue}
          onBlur={event => {
            this.props.onBlur(event)
          }}
          onKeyDown={event => {
            this.props.onKeyDown(event)
          }}
          onChange={event => {
            this.props.onBlur(event)
          }}
        />
      </>
    )
  }
}

const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
  <>
    {columns
      .map(column => ({
        ...column,
        toggle: toggles[column.dataField]
      }))
      .map(column => (
        <button
          type="button"
          key={column.dataField}
          className={`m-1 btn ${column.toggle ? 'btn-secondary' : 'btn-light'}`}
          data-toggle="button"
          aria-pressed={column.toggle ? 'true' : 'false'}
          onClick={() => onColumnToggle(column.dataField)}>
          {column.text}
        </button>
      ))}
  </>
)

export default class DataTablePerizia extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      data: [],
      sizePerPage: 10,
      total: 0,
      rows: false,
      rowCount: 0,
      // selezione
      rowSelected: [],
      checkedQrCode: true
    }
  }

  AddButton = () => {
    return (
      <button
        type="button"
        className={`btn btn-primary m-1`}
        data-toggle="button"
        onClick={async e => {
          const idToken = loadIdToken()

          const headers = {
            Authorization: `Bearer ${idToken}`
          }

          try {
            const response = await axios({
              baseURL,
              url: '/crud',
              method: 'post',
              headers,
              data: {}
            })
            let data = response.data
            var copiedData = [data[0], ...this.state.data]
            this.setState({
              data: copiedData
            })
          } catch (error) {
            console.error(error)
          }
        }}>
        Aggiungi riga vuota
      </button>
    )
  }

  CloneConfirmedColumns = async columns => {
    if (this.state.rowSelected.length > 0) {
      const idToken = loadIdToken()

      let data = {}
      columns.forEach(item => {
        data[item.dataField] = this.state.rowSelected[0][item.dataField]
      })

      //console.log(data)

      const headers = {
        Authorization: `Bearer ${idToken}`
      }

      try {
        const response = await axios({
          baseURL,
          url: '/crudClone',
          method: 'post',
          headers,
          data
        })
        let dataResponse = response.data
        //console.log(dataResponse[0]);
        var copiedData = [dataResponse[0], ...this.state.data]
        this.setState({
          data: copiedData
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  expandRow = {
    renderer: row => (
      <RowExpanded
        row={row}
        clickEliminaRow={async id => {
          const idToken = loadIdToken()

          const headers = {
            Authorization: `Bearer ${idToken}`
          }
          try {
            const response = await axios({
              baseURL,
              url: '/crud',
              method: 'delete',
              headers,
              data: { id }
            })
            let data = response.data
            //console.log(data);
            if (data.delete == true) {
              var copiedData = this.state.data.filter(item => {
                if (item.id == id) {
                  return false
                } else {
                  return true
                } //aggingi quelli non eliminati
              })

              this.setState({
                data: copiedData
              })
              window.alert(`Riga ${id} eliminata correttamente`)
            } else {
              window.alert('Nessuna riga eliminata...', data)
            }
          } catch (error) {
            console.error(error)
          }
        }}
      />
    ),
    showExpandColumn: true,
    expandByColumnOnly: true
  }

  selectRowProps = {
    mode: 'checkbox',
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect == true) {
        this.setState({ rowSelected: [...this.state.rowSelected, row] })
      } else {
        var rr = this.state.rowSelected.filter((value, index, arr) => {
          if (value.id != row.id) {
            return value
          }
        })
        this.setState({ rowSelected: rr })
      }
    }
  }

  RemotePagination = ({ data, page, sizePerPage, onTableChange, handleDataChange, totalSize }) => (
    <ToolkitProvider keyField="id" data={data} columns={this.columns} columnToggle>
      {props => (
        <>
          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Mostra pulsanti
          </button>
          <div className="collapse" id="collapseExample">
            <ModalAreaCopy columns={this.columns} confirmedColumns={this.CloneConfirmedColumns} />
            <this.AddButton />
            <CustomToggleList
              {...props.columnToggleProps}
              onColumnToggle={field => {
                //console.log(field);
                this.columns.forEach(item => {
                  if (item.dataField == field) {
                    item.hidden = !item.hidden
                  }
                })
                props.columnToggleProps.onColumnToggle(field)
              }}
            />
          </div>
          <BootstrapTable
            headerClasses="btn-warning active"
            onDataSizeChange={handleDataChange}
            striped={true}
            hover={true}
            condensed={true}
            remote
            {...props.baseProps}
            filter={filterFactory()}
            pagination={paginationFactory({
              page,
              sizePerPage,
              totalSize
            })}
            onTableChange={onTableChange}
            expandRow={this.expandRow}
            selectRow={this.selectRowProps}
            cellEdit={cellEditFactory({
              mode: 'click',
              blurToSave: true,

              beforeSaveCell(oldValue, newValue, row, column, done) {
                done()
                return { async: true }
              }
            })}
          />
        </>
      )}
    </ToolkitProvider>
  )

  columnGeneratorQrCode(cell, row) {
    return (
      <QRCode
        size={330}
        bgColor={'#FFEFD5'}
        id={`qr_${row.id}`}
        style={{ width: 30, height: 30 }}
        value={'https://p.erroridiconiazione.com/' + row.stato + '/' + row.anno + '/' + row.valore + '/' + row.uuid}
      />
    )
  }

  columns = [
    {
      dataField: 'qrcode',
      isDummyField: true,
      text: 'qrcode',
      editable: false,
      hidden: false,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => { //console.log(row) },
      // },
      formatter: this.columnGeneratorQrCode
    },
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      hidden: true
    },
    {
      dataField: 'added',
      text: 'Added',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'stato',
      text: 'Stato',
      sort: true,
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'anno',
      text: 'Anno',
      sort: true,
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'valore',
      text: 'Valore',
      sort: true,
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'uuid',
      text: 'UUID',
      sort: true,
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'collegamento',
      text: 'Collegamento',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'conservazione',
      text: 'Conservazione',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'contorno',
      text: 'Contorno',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'data_perizia',
      text: 'Data perizia',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'descrizione',
      text: 'Descrizione',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'diametro',
      text: 'Diametro',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'lega_metallica',
      text: 'Lega metallica',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'note',
      text: 'Note',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'collezione',
      text: 'Collezione',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'orientamento_asse',
      text: 'Orientamento asse',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'periodo',
      text: 'Periodo',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'peso',
      text: 'Peso',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'rarita',
      text: 'Rarita',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'riferimento',
      text: 'Riferimento Errore',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'spessore',
      text: 'Spessore',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'valuta',
      text: 'Valuta',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'variante',
      text: 'Errore/Variante',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'zecca',
      text: 'Zecca',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'veridicita',
      text: 'Veridicità',
      sort: true,
      hidden: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.CHECKBOX
      },
      formatter: (value, column, index) => {
        return value ? 'VERA' : 'FALSA'
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => <QualityRanger {...editorProps} value={value} />
    }
  ]

  async componentDidMount() {
    const idToken = loadIdToken()

    const headers = {
      Authorization: `Bearer ${idToken}`
    }

    try {
      const response = await axios({
        baseURL,
        url: '/crud_query',
        method: 'post',
        headers,
        data: {
          page: 1,
          sizePerPage: 10,
          sortField: 'id',
          sortOrder: 'desc'
        }
      })
      let data = response.data
      this.setState({
        page: Number(data.current_page),
        data: data.data,
        sizePerPage: Number(data.per_page),
        total: Number(data.total)
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize })
    //console.log("dataSize", dataSize)
  }

  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder, filters, cellEdit }) => {
    //console.log(type);

    const idToken = loadIdToken()

    const headers = {
      Authorization: `Bearer ${idToken}`
    }

    //console.log(page, sizePerPage, sortField, sortOrder, filters);

    if (type == 'cellEdit') {
      const { rowId, dataField, newValue } = cellEdit
      //console.log(rowId, dataField, newValue);
      try {
        const response = await axios({
          baseURL,
          url: '/crud',
          method: 'put',
          headers,
          data: { rowId, dataField, newValue }
        })
        let data = response.data
        //console.log(data[0]);
        var copiedData = this.state.data.map(item => {
          if (item.id == rowId) {
            return data[0]
          } else {
            return item
          }
        })
        this.setState({
          data: copiedData
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (type == 'filter' || type == 'pagination' || type == 'sort')
      if (type == 'pagination') {
        this.setState({ rowSelected: [] })
      }
    try {
      const response = await axios({
        baseURL,
        url: '/crud_query',
        method: 'post',
        headers,
        data: {
          page,
          sizePerPage,
          sortField: sortField || 'id',
          sortOrder: sortOrder || 'desc',
          filters
        }
      })
      let data = response.data
      this.setState({
        page: Number(data.current_page),
        data: data.data,
        sizePerPage: Number(data.per_page),
        total: Number(data.total)
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickToggle = e => {
    //console.log(this.state);
    this.setState(Object.assign({}, this.state, { checkedQrCode: !this.state.checkedQrCode }))
  }

  columnGeneratorQrCodeStatico() {
    return <QRCode size={330} bgColor={'#f2e6fd'} id="qr_statico" style={{ width: 30, height: 30 }} value={'https://www.numismaticadelpup.com'} />
  }

  render() {
    const { data, sizePerPage, page, total } = this.state

    return (
      <div>
        <this.RemotePagination
          data={data}
          page={page}
          sizePerPage={sizePerPage}
          totalSize={total}
          onTableChange={this.handleTableChange}
          cellEdit={cellEditFactory({ mode: 'click' })}
          onDataSizeChange={this.onDataSizeChange}
        />
        {this.columnGeneratorQrCodeStatico()}
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check onClick={this.onClickToggle} value={this.state.checkedQrCode} type="checkbox" label="Qr.code statico" />
        </Form.Group>
        {this.state.rowSelected.length > 0 && (
          <PDFViewer style={{ margin: '2%', width: '96%', height: '1280px' }}>{Cartellini(this.state.rowSelected, this.state.uri, this.state.checkedQrCode)}</PDFViewer>
        )}
      </div>
    )
  }
}
