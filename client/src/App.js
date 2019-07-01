import React, { Component } from 'react'
import './App.css'

var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];

const cellEditProp = {
  mode: 'click'
};

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




handleChange = evt => {
  this.setState({ [evt.target.name]: evt.target.value })
  console.log(this.state.text)
}
render() {
    return (
      <div className="App">
        {/* <h3>Text Cow. Moo</h3>
        <code>{this.state.cow}</code>
        <form onSubmit={this.customPrice}>
          <label>Custom Cow Text:</label>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type="submit">Show me a talking cow!</button>
        </form> */}
        <BootstrapTable className="priceTable" data={products} cellEdit={ cellEditProp }>
          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>

      </div>
    )
  }
}
export default App