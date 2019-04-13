import React from 'react';
import {connect} from 'react-redux';
import { fetch_store_information,store_what_to_send } from '../../../store/action-creators/store';
import { search  } from '../../../store/action-creators/product';

import { notify } from '../../../store/action-creators/app';
import storeA from '../../../store/actions/store';
import Spinner from "../../../components/shared/spinner";
import { withRouter } from 'react-router';
import product from '../../../store/actions/product';

class ViewOne extends React.Component{
    constructor(props){
        super(props);
        props.fetch_store_information(props.match.params.store_name)
        this.state = {
            first_load_out_of_the_way:false,
            purchase_info: {
                amount_to_be_purchased: 1,
                sum_price_in_fiat: '-',
                cryptocurrency_chosen: "Ether"
            },
            product_selected: {
                price: "-",
                currency: "-",
                quantity: 1
            }
        }    
    }

    componentWillMount(){
        const pi = this.props.obj_to_send;
          
        if( Boolean(Object.keys(pi).length) ){
            this.setState({
                    purchase_info: {
                        sum_price_in_fiat: pi.sum_price_in_fiat,
                        amount_to_be_purchased: pi.amount_to_be_purchased,
                        cryptocurrency_chosen: pi.cryptocurrency_chosen
                    },
                    product_selected:  this.props.store_products.filter(p=>{
                        return p.product_id === pi.product_id
                    })[0]
        
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            
            this.setState({
                store: nextProps.store,
                products: nextProps.store_products,
                type: nextProps.type,
                message: nextProps.message,
                product_found: nextProps.product_found
            })

            if(Boolean(nextProps.product_found_id)){
                this.handleProductSelect(null, nextProps.product_found_id)
            }

            if(this.state.first_load_out_of_the_way === false){
                this.setState({
                    first_load_out_of_the_way: nextProps.type !== storeA.FIND_STORE_INFORMATION_REQUEST
                })
            }
        }
    }
    
    handleSearch = e => {
        e.persist();
        clearTimeout(this.TypingId);
        let {  value } = e.target;
        this.TypingId = setTimeout(() => {
          this.setState(
            {
              short_code: value,
            },
            () => this.props.search(value)
          );
        }, 500);

      };

    handleProductSelect = (e, id) =>{
       
        const selected_product_id  = id ? id: e.target.value;
        
        const product = this.props.store_products.filter(p=>{
            return p.product_id === selected_product_id
        })[0];
        
        this.setState({
            product_selected: product,
            purchase_info:{
                ...this.state.purchase_info,
                sum_price_in_fiat: this.state.purchase_info.amount_to_be_purchased * product.price

            }
        });

    }

    handleFiatPricing = e =>{
        const amount_to_be_purchased = e.target.value;
        this.setState({
            purchase_info: {
                ...this.state.purchase_info,
                amount_to_be_purchased,
                sum_price_in_fiat: amount_to_be_purchased * this.state.product_selected.price
            } 
        });

    }

    handleCryptoSelect = e =>{
        const crypto = e.target.value;
        this.setState({
            purchase_info: {
                ...this.state.purchase_info,
                cryptocurrency_chosen: crypto
            }
        })
    }

    handleStepOne  = () => {

        let toSend = {
            amount_to_be_purchased: this.state.purchase_info.amount_to_be_purchased,
            sum_price_in_fiat: this.state.purchase_info.sum_price_in_fiat,
            product_id: this.state.product_selected.product_id,
            cryptocurrency_chosen: this.state.purchase_info.cryptocurrency_chosen,
            currency: this.state.product_selected.currency,
            store_slug: this.props.match.params.store_name
        }

        if(
            toSend.amount_to_be_purchased !== 0
            && toSend.sum_price_in_fiat !== "-"
            && Boolean(toSend.product_id
        ) === true){
                this.props.store_what_to_send(toSend);
            }
        else {
            notify(<p>Fill Out All Fields.</p>, "error")
        }
    }

        render(){

            const {
                store, 
                product_selected,
                products,
                purchase_info
            } = this.state;

            let {
                first_load_out_of_the_way
            } = this.state;

            const is_there_a_store = Boolean(store) === true && Boolean(Object.keys(store).length > 0); 
            switch (first_load_out_of_the_way) {
                case false:
                    return <Spinner/>
                
                default:
                    switch (is_there_a_store) {
                        case true:
                                return <div className='step-1 xs-12'>
                    
                            <div className='form-group xs-12'>
                                <label>Store Name</label>
                                <h4>{store.name}</h4>
                            </div>

                            <div className='xs-12 form-group'>
                                <div className='xs-12'>
                                    
                                    <label>Enter Product Code (Optional)</label>
                                    
                                    <input name="product_code" 
                                    className='form-control'
                                    value={this.state.product_code} 
                                    onChange = {this.handleSearch}/>
                                    
                                    {this.state.short_code &&
                                        <React.Fragment>
                                            {this.state.product_found ?
                                                <span className='match found'>Found Match</span>
                                                :
                                                <span className='match not-found'>No Matches</span>
                                            }
                                        </React.Fragment>
                                    }
                                </div>

                            </div>
                            
                            <h4 className='xs-12'>Or</h4>
                             
                            <div className='form-group xs-12'>
                                <div className='xs-8'>
                                    <label>Select Product </label>
                                    <select name='products' className='form-control' 
                                    value={product_selected.product_id} 
                                    onChange={this.handleProductSelect}>
                                    <option  hidden>Select a product </option>
                                        {products.map((p,i)=>{
                                            return <option value={p.product_id} key={i}>{p.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="xs-4 unit-price">
                                    <label className='sm-12 f-r'>Unit Price</label>
                                    <h5 className='xs-12'>{product_selected.price} {product_selected.currency}</h5>
                                </div>

                            </div>
        
                            <div className='form-group xs-12'>
                                <div className='xs-7'>
                                    <label>Purchase Quantity ?</label>
                                    <input type='number' 
                                    className='form-control' 
                                    name='quantity' 
                                    min={1} 
                                    value={purchase_info.amount_to_be_purchased}
                                    onChange={this.handleFiatPricing}
                                    max={product_selected.quantity} placeholder="30"/>
                                </div>

                                <div className="xs-5 unit-price">
                                    <label className='sm-12 f-r'>Fiat Sum Price</label>
                                    <h5 className='xs-12'>{purchase_info.sum_price_in_fiat} {product_selected.currency}</h5>
                                </div>

                            </div>
        
                            <div className='form-group xs-12'>
                                <div className='xs-12'>
                                    <label>Please select the cryptocurrency you wish to pay in </label>
                                    <select name='products' className='form-control' value={purchase_info.cryptocurrency_chosen} onChange={this.handleCryptoSelect}>
                                        <option value="Bitcoin">Bitcoin</option>
                                        <option value="Ether">Ether</option>
        
                                    </select>
                                </div>
                            </div>   
        
                            <div className='form-group xs-12'>
                                <div className='xs-12'>
                                    <button className="form-control btn btn-info" 
                                    name="Continue" type='submit' 
                                    onClick={this.handleStepOne}>Continue</button>
                                </div>
                            </div>
                        </div>
                    
                        default:
                            return <div className='xs-12 t-c'>
                                <h4> Store Not Found.</h4>
                            </div>
                }
            }

        
    }
}


const mapStateToProps = state=>{
    return {
        store: state.store.data,
        store_products: state.store.products,
        obj_to_send: state.store.obj_to_send,

        type: state.store.type,
        message: state.store.message,
        product_found: state.product.type === product.SEARCH_PRODUCT_WENT,
        product_found_id: state.product.product_found_id
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        search : code => dispatch( search(code) ),
        store_what_to_send: (obj)=> dispatch(store_what_to_send(obj)),
        fetch_store_information :(store)=> dispatch(fetch_store_information(store))
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(ViewOne));
   