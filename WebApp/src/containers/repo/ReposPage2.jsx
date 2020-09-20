import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import RowExpanded from "./rowExpanded";

import React from "react";
import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

import { PDFViewer } from "@react-pdf/renderer";

import MyDocument from "./cartellino";

const { ToggleList } = ColumnToggle;

const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
  <div
    className="btn-group btn-group-toggle btn-group-horizontal"
    data-toggle="buttons"
  >
    {columns
      .map((column) => ({
        ...column,
        toggle: toggles[column.dataField],
      }))
      .map((column) => (
        <button
          type="button"
          key={column.dataField}
          className={`btn btn-warning ${column.toggle ? "active" : ""}`}
          data-toggle="button"
          aria-pressed={column.toggle ? "true" : "false"}
          onClick={() => onColumnToggle(column.dataField)}
        >
          {column.text}
        </button>
      ))}
  </div>
);

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    hidden: true,
  },
  {
    dataField: "added",
    text: "Added",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "stato",
    text: "Stato",
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "anno",
    text: "Anno",
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "valore",
    text: "Valore",
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "uuid",
    text: "UUID",
    hidden: false,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "collegamento",
    text: "Collegamento",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "conservazione",
    text: "Conservazione",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "contorno",
    text: "Contorno",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "data_perizia",
    text: "Data perizia",
    sort: true,
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "descrizione",
    text: "Descrizione",
    sort: true,
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "diametro",
    text: "Diametro",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "lega_metallica",
    text: "Lega metallica",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "note",
    text: "Note",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "orientamento_asse",
    text: "Orientamento asse",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "periodo",
    text: "Periodo",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "peso",
    text: "Peso",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "rarita",
    text: "Rarita",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "riferimento",
    text: "Riferimento",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "spessore",
    text: "Spessore",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "valuta",
    text: "Valuta",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "variante",
    text: "Variante",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "zecca",
    text: "Zecca",
    sort: true,
    hidden: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
    editor: {
      type: Type.TEXTAREA,
    },
  },
];

const expandRow = {
  renderer: (row) => <RowExpanded row={row} />,
  showExpandColumn: true,
  expandByColumnOnly: true,
};

var rowSelected = [];
const selectRowProps = {
  mode: "checkbox",
  onSelect: (row, isSelect, rowIndex, e) => {
    if (isSelect == true) {
      rowSelected.push(row);
    } else {
      rowSelected = rowSelected.filter((value, index, arr) => {
        if (value.id != row.id) {
          return value;
        }
      });
    }
    console.log(rowSelected);
  },
};

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <ToolkitProvider keyField="id" data={data} columns={columns} columnToggle>
    {(props) => (
      <div>
        <CustomToggleList
          {...props.columnToggleProps}
          onColumnToggle={(field) => {
            console.log(field);
            columns.forEach((item) => {
              if (item.dataField == field) {
                item.hidden = !item.hidden;
              }
            });
            props.columnToggleProps.onColumnToggle(field);
          }}
        />
        <hr />
        <BootstrapTable
          striped={true}
          hover={true}
          condensed={true}
          remote
          {...props.baseProps}
          filter={filterFactory()}
          pagination={paginationFactory({
            page,
            sizePerPage,
            totalSize,
          })}
          onTableChange={onTableChange}
          expandRow={expandRow}
          selectRow={selectRowProps}
          cellEdit={cellEditFactory({
            mode: "click",
            blurToSave: true,
            beforeSaveCell(oldValue, newValue, row, column, done) {
              setTimeout(() => {
                if (window.confirm("Do you want to accep this change?")) {
                  done(); // contine to save the changes
                } else {
                  done(false); // reject the changes
                }
              }, 0);
              return { async: true };
            },
          })}
        />
      </div>
    )}
  </ToolkitProvider>
);

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    try {
      const response = await axios({
        baseURL: "http://localhost:3000",
        url: "/crudQuery",
        method: "post",
        headers,
        data: {
          page: 1,
          sizePerPage: 10,
          sortField: "id",
          sortOrder: "desc",
        },
      });
      let data = response.data;
      console.log("QUI1", data);
      this.setState({
        page: Number(data.current_page),
        data: data.data,
        sizePerPage: Number(data.per_page),
        total: Number(data.total),
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleTableChange = async (
    type,
    { page, sizePerPage, sortField, sortOrder, filters, cellEdit }
  ) => {
    console.log(type);

    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    console.log(page, sizePerPage, sortField, sortOrder, filters);

    if (type == "cellEdit") {
      const { rowId, dataField, newValue } = cellEdit;
      console.log(rowId, dataField, newValue);
      try {
        const response = await axios({
          baseURL: "http://localhost:3000",
          url: "/crud",
          method: "put",
          headers,
          data: { rowId, dataField, newValue },
        });
        let data = response.data;
        console.log(data[0]);
        var copiedData = this.state.data.map((item) => {
          if (item.id == rowId) {
            return data[0];
          } else {
            return item;
          }
        });
        this.setState({
          data: copiedData,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (type == "filter" || type == "pagination" || type == "sort")
      try {
        const response = await axios({
          baseURL: "http://localhost:3000",
          url: "/crudQuery",
          method: "post",
          headers,
          data: {
            page,
            sizePerPage,
            sortField: sortField || "id",
            sortOrder: sortOrder || "desc",
            filters,
          },
        });
        let data = response.data;
        this.setState({
          page: Number(data.current_page),
          data: data.data,
          sizePerPage: Number(data.per_page),
          total: Number(data.total),
        });
      } catch (error) {
        console.error(error);
      }
  };

  MyComponent = MyDocument(rowSelected);

  render() {
    if (this.state == null) return null;
    const { data, sizePerPage, page, total } = this.state;
    return (
      <div>
        <RemotePagination
          data={data}
          page={page}
          sizePerPage={sizePerPage}
          totalSize={total}
          onTableChange={this.handleTableChange}
          cellEdit={cellEditFactory({ mode: "click" })}
        />
        <button
          type="button"
          className={`btn btn-primary`}
          data-toggle="button"
          onClick={(e) => {
            this.setState({ rows: true });
          }}
        >
          Genera PDF
        </button>
        {this.state.rows && <PDFViewer style={{width:"100%", height:"800px"}}>{MyDocument(rowSelected)}</PDFViewer>}
      </div>
    );
  }
}

export default Container = Container;
