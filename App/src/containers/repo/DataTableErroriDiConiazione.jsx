import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import paginationFactory from 'react-bootstrap-table2-paginator'

//import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'

import axios from 'axios'
import React from 'react'

import { loadIdToken } from '../../utils/apiUtils'

const baseURL = process.env.REACT_APP_BASE_PATH

const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
  <>
    {columns
      .map(column => ({
        ...column,
        toggle: toggles[column.dataField]
      }))
      .map(column => {
        if (column.dataField != 'id' && column.dataField != 'id_perizia') {
          return (
            <button
              type="button"
              key={column.dataField}
              className={`m-1 btn ${column.toggle ? 'btn-secondary' : 'btn-light'}`}
              data-toggle="button"
              aria-pressed={column.toggle ? 'true' : 'false'}
              onClick={() => onColumnToggle(column.dataField)}>
              {column.text}
            </button>
          )
        }
      })}
  </>
)

export default class DataTableErroriDiConiazione extends React.Component {
  row = this.props.row

  AddButton = ({ row }) => {
    return (
      <button
        type="button"
        className={`btn btn-primary m-1`}
        data-toggle="button"
        onClick={async (e) => {
          const idToken = loadIdToken()

          const headers = {
            Authorization: `Bearer ${idToken}`
          }

          try {
            const response = await axios({
              baseURL,
              url: '/crud_errori',
              method: 'post',
              headers,
              data: {
                id_perizia: row.id
              }
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
        Aggiungi riga
      </button>
    )
  }

  RemotePagination = ({ row, data, page, sizePerPage, onTableChange, handleDataChange, totalSize }) => (
    <ToolkitProvider keyField="id" data={data} columns={this.columns} columnToggle>
      {props => (
        <>
          <CustomToggleList
            {...props.columnToggleProps}
            onColumnToggle={field => {
              this.columns.forEach(item => {
                if (item.dataField == field) {
                  item.hidden = !item.hidden
                }
              })
              props.columnToggleProps.onColumnToggle(field)
            }}
          />
          <BootstrapTable
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
            cellEdit={cellEditFactory({
              mode: 'click',
              blurToSave: true
            })}
          />
        </>
      )}
    </ToolkitProvider>
  )

  columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      hidden: true
    },
    {
      dataField: 'id_perizia',
      text: 'ID_PERIZIA',
      sort: true,
      hidden: true
    },
    {
      dataField: 'macro_categoria',
      text: 'Marco categoria',
      hidden: false,
      sort: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'categoria',
      text: 'Categoria',
      hidden: false,
      sort: true,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    // {
    //   dataField: 'ripetitivita',
    //   text: 'Ripetitivita',
    //   editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
    //     <QualityRanger {...editorProps} value={value} />
    //   )
    // },
    {
      dataField: 'ripetitivita',
      text: 'Ripetitivita',
      hidden: false,
      sort: true,
      editor: {
        type: Type.CHECKBOX
      }
    },
    {
      dataField: 'codice',
      text: 'Codice',
      hidden: false,
      sort: true,
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
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    },
    {
      dataField: 'riferiemento_esterno',
      text: 'Riferiemento esterno',
      sort: true,
      hidden: false,
      filter: textFilter({
        caseSensitive: false // default is false, and true will only work when comparator is LIKE
      }),
      editor: {
        type: Type.TEXTAREA
      }
    }
  ]

  async componentDidMount() {
    const idToken = loadIdToken()

    const row = this.props.row

    const headers = {
      Authorization: `Bearer ${idToken}`
    }

    try {
      const response = await axios({
        baseURL,
        url: '/crud_errori_query',
        method: 'post',
        headers,
        data: {
          page: 1,
          sizePerPage: 10,
          sortField: 'id',
          sortOrder: 'desc',
          id_perizia: row.id
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
  }

  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder, filters, cellEdit }) => {

    const idToken = loadIdToken()

    const row = this.props.row

    const headers = {
      Authorization: `Bearer ${idToken}`
    }

    if (type == 'cellEdit') {
      const { rowId, dataField, newValue } = cellEdit
      try {
        const response = await axios({
          baseURL,
          url: '/crud_errori',
          method: 'put',
          headers,
          data: { rowId, dataField, newValue }
        })
        let data = response.data
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
      try {
        const response = await axios({
          baseURL,
          url: '/crud_errori_query',
          method: 'post',
          headers,
          data: {
            page,
            sizePerPage,
            sortField: sortField || 'id',
            sortOrder: sortOrder || 'desc',
            filters,
            id_perizia: row.id
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

  render() {
    if (this.state == null) return null
    const { data, sizePerPage, page, total } = this.state
    const { row } = this.props
    return (
      <div className="card border-primary mb-3 mx-auto" style={{}}>
        <div className="card-header">Errori di coniazione</div>
        <div className="card-body text-primary">
          <this.AddButton row={row} />
          <this.RemotePagination
            row={row}
            data={data}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={total}
            onTableChange={this.handleTableChange}
            cellEdit={cellEditFactory({ mode: 'click' })}
            onDataSizeChange={this.onDataSizeChange}
          />
        </div>
      </div>
    )
  }
}
