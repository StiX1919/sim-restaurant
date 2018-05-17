import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
    }

    this.addFoodItem = this.addFoodItem.bind(this)
    this.addFoodPrice = this.addFoodPrice.bind(this)
    this.addFoodDescripion = this.addFoodDescripion.bind(this)
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

    return (
      <div className="App">
        <div className='characterCreatorBox'>
          <h1>Create Your Character</h1>
          <div>
            <h3>New Food Item</h3>
            <input onChange = {(e) => this.addFoodItem(e)} value={this.state.newFoodItem}/>
            <h3>Food Price</h3>
            <input onChange = {(e) => this.addFoodPrice(e)} value={this.state.newFoodPrice}/>
            <h3>Description</h3>
            <input onChange = {(e) => this.addFoodDescripion(e)} value={this.state.newFoodDescription}/>
          </div>
          <button onClick = {() => this.addFoodToList()}/>
        </div>
        

      </div>
    );
  }
}

export default App;
