import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import React from "react";
import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
  },
  {
    dataField: "added",
    text: "Added",
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
    dataField: "stato",
    text: "Stato",
    sort: true,
  },
  {
    dataField: "uuid",
    text: "UUID",
    sort: true,
  },
  {
    dataField: "valore",
    text: "Valore",
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



class RowExpanded extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    const { row } = this.props;
    return <div>{row.id}</div>
  }
}

export default RowExpanded = RowExpanded;
