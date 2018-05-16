import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      color: 'red'
    }

    this.changeHeader = this.changeHeader.bind(this)

    this.addFoodItem = this.addFoodItem.bind(this)
    this.addFoodPrice = this.addFoodPrice.bind(this)
    this.addFoodDescripion = this.addFoodDescripion.bind(this)
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo() {
    axios.get('/api/serverInfo').then(response => {
      console.log(response.data)
      this.setState({foodInfo: response.data})
    })
  }

  changeHeader() {
    axios.get('/api/getColor').then(response => {
      console.log(response.data)
      this.setState({color: response.data})
    })
  }


  addFoodItem(e) {
    this.setState({newFoodItem: e.target.value})
  }
  addFoodPrice(e) {
    this.setState({newFoodPrice: e.target.value})
  }
  addFoodDescripion(e) {
    this.setState({newFoodDescription: e.target.value})
  }

  addFoodToList() {
    if(this.state.newFoodItem && this.state.newFoodPrice && this.state.newFoodDescription){
      axios.post('/api/addNewFoodToList', {name: this.state.newFoodItem,
        price: this.state.newFoodPrice,
        description: this.state.newFoodDescription}).then(response => {
          this.setState({foodInfo: response.data, newFoodItem: '', newFoodPrice: '', newFoodDescription: ''})
        })
    }
  }

  render() {
    console.log(this.state)
    let foodCard = 'Loading'
    if(this.state.foodInfo){
      foodCard = this.state.foodInfo.map(foodItem => {
        return <div>
        <h2>{foodItem[0]}</h2>
        <h3>{foodItem[1]}</h3>
        <h3>{foodItem[2]}</h3>
      </div>
      })
    }
    


    return (
      <div className="App">
        <header className="App-header" style={{'backgroundColor': this.state.color}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => this.changeHeader()}>Hello</button>
        <div>
          <h3>New Food Item</h3>
          <input onChange = {(e) => this.addFoodItem(e)} value={this.state.newFoodItem}/>
          <h3>Food Price</h3>
          <input onChange = {(e) => this.addFoodPrice(e)} value={this.state.newFoodPrice}/>
          <h3>Description</h3>
          <input onChange = {(e) => this.addFoodDescripion(e)} value={this.state.newFoodDescription}/>
        </div>
        <button onClick = {() => this.addFoodToList()}/>
        {this.state.foodInfo &&
          foodCard
        }

      </div>
    );
  }
}

export default App;
