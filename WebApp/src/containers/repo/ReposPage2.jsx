import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import RowExpanded from "./rowExpanded";

import React from "react";
import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

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
  },
  {
    dataField: "stato",
    text: "Stato",
    sort: true,
  },
  {
    dataField: "anno",
    text: "Anno",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "valore",
    text: "Valore",
    sort: true,
  },
  {
    dataField: "uuid",
    text: "UUID",
    sort: true,
  },
  {
    dataField: "collegamento",
    text: "Collegamento",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "conservazione",
    text: "Conservazione",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "contorno",
    text: "Contorno",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "data_perizia",
    text: "Data perizia",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "descrizione",
    text: "Descrizione",
    sort: true,
    editor: {
      type: Type.TEXTAREA,
    },
  },
  {
    dataField: "diametro",
    text: "Diametro",
    sort: true,
  },
  {
    dataField: "lega_metallica",
    text: "Lega metallica",
    sort: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
  },
  {
    dataField: "note",
    text: "Note",
    sort: true,
    filter: textFilter({
      caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    }),
  },
  {
    dataField: "orientamento_asse",
    text: "Orientamento asse",
    sort: true,
  },
  {
    dataField: "periodo",
    text: "Periodo",
    sort: true,
  },
  {
    dataField: "peso",
    text: "Peso",
    sort: true,
  },
  {
    dataField: "rarita",
    text: "Rarita",
    sort: true,
  },
  {
    dataField: "riferimento",
    text: "Riferimento",
    sort: true,
  },
  {
    dataField: "spessore",
    text: "Spessore",
    sort: true,
  },
  {
    dataField: "valuta",
    text: "Valuta",
    sort: true,
  },
  {
    dataField: "variante",
    text: "Variante",
    sort: true,
  },
  {
    dataField: "zecca",
    text: "Zecca",
    sort: true,
  },
];

const expandRow = {
  renderer: (row) => <RowExpanded row={row} />,
  showExpandColumn: true,
  expandByColumnOnly: true,
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
            columns.forEach((item)=>{
              if(item.dataField == field){
                item.hidden = !item.hidden
              }
            })
            props.columnToggleProps.onColumnToggle(field);
          }}
        />
        <hr />
        <BootstrapTable
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
        />
      </div>
    )}
  </ToolkitProvider>
);

const RemotePagination1 = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      filter={filterFactory()}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
      expandRow={expandRow}
    />
  </div>
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
          sizePerPage: 3,
          sortField: "id",
          sortOrder: "asc",
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
    { page, sizePerPage, sortField, sortOrder, filters }
  ) => {
    console.log(type);

    const idToken = loadIdToken();

    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    console.log(page, sizePerPage, sortField, sortOrder, filters);

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
          sortOrder: sortOrder || "asc",
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

  render() {
    if (this.state == null) return null;
    const { data, sizePerPage, page, total } = this.state;
    return (
      <RemotePagination
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={total}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default Container = Container;
