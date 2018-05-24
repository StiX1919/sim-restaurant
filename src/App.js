import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      strengthStat: 2,
      speedStat: 2,
      defenseStat: 2,
      statPoints: 3
    }

    this.getMonster = this.getMonster.bind(this)

    this.strengthStatUp = this.strengthStatUp.bind(this)
    this.strengthStatDown = this.strengthStatDown.bind(this)

    this.speedStatUp = this.speedStatUp.bind(this)
    this.speedStatDown = this.speedStatDown.bind(this)

    this.defenseStatUp = this.defenseStatUp.bind(this)
    this.defenseStatDown = this.defenseStatDown.bind(this)

    this.attackButton = this.attackButton.bind(this)
  }

  componentDidMount() {
    this.getMonster()
  }

  getMonster() {
    axios.get('/api/getMonster').then(response => {
      console.log(response.data)
      this.setState({currentMonster: response.data, currentMonsterHP: response.data.HP, monsterStatus: 'alive'})
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

  strengthStatUp(){
    let oldStat = this.state.strengthStat
    let oldPoints = this.state.statPoints

    if(this.state.statPoints > 0){
      oldStat += 1
      oldPoints -= 1
    }
    this.setState({strengthStat: oldStat, statPoints: oldPoints})
  }
  strengthStatDown(){
    let oldStat = this.state.strengthStat
    let oldPoints = this.state.statPoints

    if(oldStat > 1){
      oldStat -= 1
      oldPoints += 1
    }
    this.setState({strengthStat: oldStat, statPoints: oldPoints})
  }

  speedStatUp(){
    let oldStat = this.state.speedStat
    let oldPoints = this.state.statPoints

    if(this.state.statPoints > 0){
      oldStat += 1
      oldPoints -= 1
    }
    this.setState({speedStat: oldStat, statPoints: oldPoints})
  }
  speedStatDown(){
    let oldStat = this.state.speedStat
    let oldPoints = this.state.statPoints

    if(oldStat > 1){
      oldStat -= 1
      oldPoints += 1
    }
    this.setState({speedStat: oldStat, statPoints: oldPoints})
  }

  defenseStatUp(){
    let oldStat = this.state.defenseStat
    let oldPoints = this.state.statPoints

    if(this.state.statPoints > 0){
      oldStat += 1
      oldPoints -= 1
    }
    this.setState({defenseStat: oldStat, statPoints: oldPoints})
  }
  defenseStatDown(){
    let oldStat = this.state.defenseStat
    let oldPoints = this.state.statPoints

    if(oldStat > 1){
      oldStat -= 1
      oldPoints += 1
    }
    this.setState({defenseStat: oldStat, statPoints: oldPoints})
  }

  attackButton(){
    let currMonsterHP = this.state.currentMonsterHP

    let damage = this.state.strengthStat - this.state.currentMonster.defense
    if(damage > 0){
      currMonsterHP = currMonsterHP - damage
      if(currMonsterHP <= 0){
        
        this.setState({currentMonsterHp: currMonsterHP, monsterStatus: 'dead'})
        setTimeout(this.getMonster, 3000)
      }
      this.setState({currentMonsterHP: currMonsterHP})
    }
    
    console.log('currMonsterHP', currMonsterHP, damage)
  }

  render() {

    let monsterBox = (<h1>Loading Monster...</h1>)
    if(this.state.currentMonster){
      monsterBox = (<div>
        <h2>{this.state.currentMonster.name}</h2>
        <h4>{this.state.currentMonster.description}</h4>
        <h4>Current HP: {this.state.currentMonsterHP}</h4>
      </div>)
    }
    


    return (
      <div className="App">
        <div className='characterBox'>
          <h1>Create Your Character</h1>
          <div>
            <h3>Character Name</h3>
            <input onChange = {(e) => this.addFoodItem(e)} value={this.state.newFoodItem}/>
            <h3>Job</h3>
            <input onChange = {(e) => this.addFoodPrice(e)} value={this.state.newFoodPrice}/>
            <h3>Description</h3>
            <input onChange = {(e) => this.addFoodDescripion(e)} value={this.state.newFoodDescription}/>
          </div>

          <div>
            <h4>Available Stat Points</h4>
            <h4>{this.state.statPoints}</h4>
            <h4>strength</h4>
            <button onClick={() => this.strengthStatDown()}>-1</button>
            {this.state.strengthStat}
            <button onClick={() => this.strengthStatUp()}>+1</button>
          </div>
          <div>
            <h4>speed</h4>
            <button onClick={() => this.speedStatDown()}></button>
            {this.state.speedStat}
            <button onClick={() => this.speedStatUp()}></button>
          </div>
          <div>
            <h4>defense</h4>
            <button onClick={() => this.defenseStatDown()}></button>
            {this.state.defenseStat}
            <button onClick={() => this.defenseStatUp()}></button>
          </div>
        </div>

        <button onClick={() => this.attackButton()}>Attack!!</button>

        <div className='characterBox'>
          {this.state.currentMonster && this.state.monsterStatus != 'dead' && monsterBox}
          {this.state.monsterStatus === 'dead' && <h2>Monster is Dead!</h2>}
        </div>
        

      </div>
    );
  }
}

export default App;
