import React, { Component } from 'react'
import './App.css'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var priceFeed = [
{
  id: 1,
  name: "比特幣 Bitcoin",
  buy: "HK$ 55612.02",
  sell: "HK$ 55612.02",
}, {
  id: 2,
  name: "以太幣 Ethereum",
  buy: "HK$ 1819.87",
  sell: "HK$ 1917.89",
}, {
  id: 3,
  name: "EOS",
  buy: "HK$ 45.79",
  sell: "HK$ 48.54",
}, {
  id: 4,
  name: "萊特幣 Litecoin",
  buy: "HK$ 676.71",
  sell: "HK$ 713.16",
}, {
  id: 5,
  name: "比特幣現金 BCH",
  buy: "HK$ 2744.69",
  sell: "HK$ 2892.52",
}, {
  id: 5,
  name: "瑞波幣 Ripple",
  buy: "HK$ 2.92",
  sell: "HK$ 3.09",
}, {
  id: 5,
  name: "Stellar (XLM)",
  buy: "HK$ 0.96",
  sell: "HK$ 1.02",
}, {
  id: 5,
  name: "Cardano (ADA)",
  buy: "HK$ 0.62",
  sell: "HK$ 0.66",
}, {
  id: 5,
  name: "達世幣 Dash",
  buy: "HK$ 1041.21",
  sell: "HK$ 1101.6",
}, {
  id: 5,
  name: "泰達幣 USDT",
  buy: "HK$ 7.85",
  sell: "HK$ 6.16 + 20",
}, 

];


const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

async function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);

  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }

  const response = await fetch(`/api/currency/update/${cellValue}`)
    console.log(`update price`)
    const custom = await response.json()
    const cow = custom.moo
    // this.setState({ cow, text: '' })

  alert('The whole row :\n' + rowStr);
  
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

class App extends Component {
  state = {
    cow: '',
    text: ''
  }
componentDidMount() {
    this.fetchPrices()
  }
  
fetchPrices = async () => {
    const response = await fetch(`/api/currency/get/`)
    console.log(`initial fetch price`)
    const initialCow = await response.json()
    const cow = initialCow.moo
    this.setState({ cow })
  }
customPrice = async evt => {
    evt.preventDefault()
    const text = this.state.text
    const response = await fetch(`/api/currency/update/${text}`)
    console.log(`update price`)
    const custom = await response.json()
    const cow = custom.moo
    this.setState({ cow, text: '' })
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

  const options = {
    insertModalFooter: this.createCustomModalFooter
  };
    return (
      <div className="App">
        <BootstrapTable 
          data={ priceFeed } 
          cellEdit={ cellEditProp }
          options={options}
        >
          <TableHeaderColumn width='25vw' dataField='id' hidden={true} isKey>Key</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#c8963d' } } className="currency" dataField='name'>貨幣<br/>Currency</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#76d641' } } className="buy"  dataField='buy'>買價<br/>We buy</TableHeaderColumn>
          <TableHeaderColumn width='25vw' tdStyle={ { color: '#e6f92d' } } className="sell"  dataField='sell'>售價<br/>We Sell</TableHeaderColumn>

        </BootstrapTable>
        
      </div>
    )
  }
}
export default App