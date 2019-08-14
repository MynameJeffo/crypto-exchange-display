import React, { Component } from 'react'
import './App.css'
import axios from 'axios';


import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

async function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);
  axios.put(`/api/currency/update/${row._id}/${cellValue}/${cellName}`)
  .then(result =>
    this.setState({priceFeedData: []}))
  .catch(error => 
    console.log("Cannot get price list")
  );
  
}

// function onBeforeSaveCell(row, cellName, cellValue) {
  // return true;
// }

class Home extends Component {

  state = {
    priceFeedData: [],
  };
  
componentDidMount() {
    this.fetchPrices()
  }
  
fetchPrices = async () => {

    axios.get(`/api/currency/get/`)
      .then(result =>
        this.setState({priceFeedData: result.data}))
      .catch(error => 
        console.log("Cannot get price list")
      );
  }
customPrice = async evt => {
    evt.preventDefault()
    const text = this.state.text
    axios.put(`/api/currency/update/${text}`)
      .then(result =>
        this.setState({priceFeedData: result.data}))
      .catch(error => 
        console.log("Cannot get price list")
      );
  }

createCustomModalFooter = (onClose, onSave) => {
  const style = {
    backgroundColor: '#ffffff'
  };
  return (
    <div className='modal-footer' style={ style }>
      <h3>Its a Custom footer</h3>
      
    </div>
  );
}

render() {
  const { priceFeedData } = this.state;
  const options = {
    insertModalFooter: this.createCustomModalFooter
  };
    return (
      <div className="App">
        <BootstrapTable 
          data={ priceFeedData.currencies || [] } 
          // cellEdit={ cellEditProp }
          options={options}
        >
          <TableHeaderColumn width='25vw' dataField='_id' hidden={true} isKey>Key</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#c8963d' } } className="currency" dataField='currencyEngName'>貨幣<br/>Currency</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#76d641' } } className="buy"  dataField='BUY'>買價<br/>We buy</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#e6f92d' } } className="sell"  dataField='SELL'>售價<br/>We Sell</TableHeaderColumn>

        </BootstrapTable>
        
      </div>
    )
  }
}
export default Home