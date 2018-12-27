import React from 'react';
import {connect} from 'react-redux';
import { fetch_store_information } from '../../../store/action-creators/store';
import { notify } from '../../../store/action-creators/app';
import storeA from '../../../store/actions/store';
import Spinner from "../../../components/shared/spinner";
import { withRouter } from 'react-router';

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
        if(this.props.purchase_info){
            const pi = this.props.purchase_info;
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
            })

            if(this.state.first_load_out_of_the_way === false){
                this.setState({
                    first_load_out_of_the_way: nextProps.type !== storeA.FIND_STORE_INFORMATION_REQUEST
                })
            }


        }
    }

    handleProductSelect = e =>{
       
        const selected_product_id  = e.target.value;
        
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

                this.props.process_info(toSend);
                
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
        
                            <div className='form-group xs-12'>
                                <div className='xs-8'>
                                    <label>Select a product from the list below</label>
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
                                    <label className='xs-3 sm-12 f-r'>Unit Price</label>
                                    <h5 className='xs-12'>{product_selected.price} {product_selected.currency}</h5>
                                </div>

                            </div>
        
                            <div className='form-group xs-12'>
                                <div className='xs-7'>
                                    <label>How many would you be buying ?</label>
                                    <input type='number' 
                                    className='form-control' 
                                    name='quantity' 
                                    min={1} 
                                    value={purchase_info.amount_to_be_purchased}
                                    onChange={this.handleFiatPricing}
                                    max={product_selected.quantity} placeholder="30"/>
                                </div>

                                <div className="xs-5 unit-price">
                                    <label className='xs-3 sm-12 f-r'>Fiat Sum Price</label>
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
        type: state.store.type,
        message: state.store.message
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        fetch_store_information :(store)=> dispatch(fetch_store_information(store))
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(ViewOne));
   