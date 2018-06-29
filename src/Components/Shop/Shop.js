import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './Shop.css';



import {getShop, purchaseItem} from '../../ducks/reducer'

class Shop extends Component {
    constructor(){
        super()
        this.state = {
        }


    }
    componentDidMount() {
        this.props.getShop()
    }

    
      

    render() {
        let shopItems = <h3>Loading...</h3>

        if (this.props.shopItems){
            shopItems = this.props.shopItems.map((item, index)=> {
                return <div className='descriptors2'>
                <h4>{item.name}</h4>
                <h4>{item.pwr}</h4>
                <h4>{item.spd}</h4>
                <h4>{item.def}</h4>
                <h4>{item.price}</h4>
                <button onClick={() => this.props.purchaseItem(item, this.props.inventory, item.price, this.props.gold)}>Buy</button>
            </div>
            })
        }
        return (
            <div className='shopBox'>
                <h2>Local Shop</h2> 
                <hr/>
                <div className='descriptors'>
                    <h4>Name</h4>
                    <h4>Pwr</h4>
                    <h4>Spd</h4>
                    <h4>Def</h4>
                    <h4>Price</h4>
                </div>
                <hr/>
                
                {shopItems}
                
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {getShop, purchaseItem})(Shop);