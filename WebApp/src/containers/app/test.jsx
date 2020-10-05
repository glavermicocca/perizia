import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];

const products = [
    {id:1,name:'ilmiotext1', price:'1'},
    {id:2,name:'ilmiotext2', price:'1'},
    {id:3,name:'ilmiotext3', price:'1'},
]

export default <BootstrapTable keyField='id' data={products} columns={columns} />