import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, {
  textFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

import PropTypes from "prop-types";
import React from "react";
import axios from "axios";

import { loadIdToken } from "../../utils/apiUtils";

const { ExportCSVButton } = CSVExport;

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
  },
  {
    dataField: "note",
    text: "Note",
    sort: true,
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

let products = [];

const defaultSorted = [
  {
    dataField: "id",
    order: "desc",
  },
];

function beforeSaveCell(oldValue, newValue, row, column, done) {
  setTimeout(() => {
    if (document.confirm("Do you want to accep this change?")) {
      done(true);
    } else {
      done(false);
    }
  }, 0);
  return { async: true };
}

const cellEditProps = {
  mode: "click",
  beforeSaveCell,
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <ToolkitProvider keyField="id" data={products} columns={columns} exportCSV>
      {(props) => (
        <div>
          <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
          <hr />
          <BootstrapTable {...props.baseProps} />
        </div>
      )}
    </ToolkitProvider>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      filter={filterFactory()}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      cellEdit={cellEditFactory(cellEditProps)}
      onTableChange={onTableChange}
    />
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

const getData = async () => {
  const idToken = loadIdToken();

  const headers = {
    Authorization: `Bearer ${idToken}`,
  };

  try {
    const response = await axios({
      baseURL: "http://localhost:3000",
      url: "/crud",
      method: "get",
      headers,
    });
    console.log(response.data);
    products = response.data;
  } catch (error) {
    console.log(error);
  }
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    getData();
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10,
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    console.log("PIPPO", products);
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      // Handle cell editing
      console.log(type)
      if (type === "cellEdit") {
        const { rowId, dataField, newValue } = cellEdit;
        products = products.map((row) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
      }
      let result = products;

      // Handle column filters
      result = result.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === "TEXT") {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      // Handle column sort
      if (sortOrder === "asc") {
        getData()
        // result = result.sort((a, b) => {
        //   if (a[sortField] > b[sortField]) {
        //     return 1;
        //   } else if (b[sortField] > a[sortField]) {
        //     return -1;
        //   }
        //   return 0;
        // });
      } else {
        getData()
        // result = result.sort((a, b) => {
        //   if (a[sortField] > b[sortField]) {
        //     return -1;
        //   } else if (b[sortField] > a[sortField]) {
        //     return 1;
        //   }
        //   return 0;
        // });
      }
      // this.setState(() => ({
      //   page,
      //   data: result.slice(currentIndex, currentIndex + sizePerPage),
      //   totalSize: result.length,
      //   sizePerPage,
      // }));
      this.setState(() => ({
        page,
        data: result,
        totalSize: result.length,
        sizePerPage,
      }));
    }, 2000);
  };

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={this.state.totalSize}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default Container = Container;
