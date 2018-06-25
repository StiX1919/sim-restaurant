import React, { Component } from 'react';
// import axios from 'axios'

import {connect} from 'react-redux'
import './Shop.css';



import {getShop} from '../../ducks/reducer'

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
                {this.props.shopItems &&
                    <div className='descriptors'>
                        <h4>{this.props.shopItems[0].name}</h4>
                        <h4>{this.props.shopItems[0].pwr}</h4>
                        <h4>{this.props.shopItems[0].spd}</h4>
                        <h4>{this.props.shopItems[0].def}</h4>
                        <h4>{this.props.shopItems[0].price}</h4>
                    </div>
                }
                
            </div>
        )
    }

}   
const mapStateToProps = state => state

export default connect(mapStateToProps, {getShop})(Shop);