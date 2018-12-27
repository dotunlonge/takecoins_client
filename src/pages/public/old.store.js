import React from 'react';
import {connect} from 'react-redux';
import s from 'styled-components';
import { fetch_store_information, process_purchase_information } from '../../store/action-creators/store';
import storeA from '../../store/actions/store';
import { notify } from '../../store/action-creators/app';
import config from '../../config';
import Spinner from "../../components/shared/spinner";

const W = s.div`
    height: 100vh;
    overflow: auto;
    background: black; //#1c2338;
    position: relative;

    h1{
        font-weight: 700;
        color: snow;
        padding-bottom: 1.25em;
    }

    p{
        color: #f5f5f5;
        font-size: 25px;
        font-weight: 300;
        padding-bottom: 1.5em;
    }

    .form-con{
        background: white;
        padding: 2em;
        z-index: 1;
        border-radius: 4px;
        text-align: left;

        div{
            .unit-price{
            label{
                text-align: right !important;
            }
                h5{
                    margin: 0;
                    font-size: 15px;
                    border: 1px solid #d8d1d1;
                    width: 95%;
                    margin-left: 5%;
                    height: 38px;
                    text-align: center !important;
            
                    line-height: 38px;
                    border-radius: 5px;
                    color: tomato;
                }
            }

            .form-group{
                margin: 1.5em 0;
            }

            label{
                text-align:left;
                font-size: 13px;
                color: gray;
                font-weight: 300;
                display : block;
            }
        }
    }


    #company-logo{
        margin-top: 20px;
        color: #6465ff;
    }


    .step-2{

        .form-group{
            &.bar{
                border-top: 1px solid #eee;
                padding: 15px 0 0px;
                margin: 15px 0 0;
            }
        }
        h4{
            font-weight: 300;
            font-size: 20px;
            padding: .25em .5em;
            color: #666;
        }
    
        #refresh{
            color: darkslategray;
            font-size: 14px;
            padding: 0;
            margin: 0;
            height: 40px;
            line-height: 40px;
            float: right;

            span{
                color: red;
            }
        }

        .well{
            background: #e4e4e4;
            padding: 1em;
            border-radius: 5px;
        }
    }
`;

class Store extends React.Component{
    constructor(props){
        super(props);
        props.fetch_store_information(props.match.params.store_name)
        this.state = {
            count: config.REFRESH_TIME_IN_SECONDS,
            is_first_load: false,
            step: 1,
            purchase_info: {
                amount_to_be_purchased: '',
                sum_price_in_fiat: '-',
                cryptocurrency_chosen: "Ether"
            },
            processed_purchase_info:{

            },
            product_selected: {
                price: "-",
                currency: "-",
                quantity: 1
            }
        }    
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
          
            this.setState({
                store: nextProps.store,
                products: nextProps.store_products,
                type: nextProps.type,
                message: nextProps.message,
                processed_purchase_info: nextProps.processed_purchase_info
            })

            if( this.state.is_first_load === false ){
                this.setState({
                    is_first_load: nextProps.type === storeA.FIND_STORE_INFORMATION_WENT
                })
            }
        }
    }

    handleProductSelect = e =>{
        const selected_product_id  = e.target.value;

        const product = this.state.products.filter(p=>{
            return p.product_id = selected_product_id
        })[0];

        this.setState({
            product_selected: product
        })
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

    process_info = (obj)=>{
        this.props.process_purchase_information(obj)
           
        this.intervalId = setInterval(()=>{
            this.setState(p=>{
                if(p.count === 1){
                    this.props.process_purchase_information(obj)
                    return {
                        count: config.REFRESH_TIME_IN_SECONDS,
                    }
                }else{
               return { 
                   count: p.count - 1
               }
            }
            })
        },1000);

        
    }

    handleStepOne  = () => {
        let toSend = {
            amount_to_be_purchased: this.state.purchase_info.amount_to_be_purchased,
            sum_price_in_fiat: this.state.purchase_info.sum_price_in_fiat,
            product_id: this.state.product_selected.product_id,
            cryptocurrency_chosen: this.state.purchase_info.cryptocurrency_chosen,
            currency: this.state.product_selected.currency
        }

        if(
            toSend.amount_to_be_purchased !== 0
            && toSend.sum_price_in_fiat !== "-"
            && Boolean(toSend.product_id
        ) === true){
            this.setState({
                step: 2
            })
                this.process_info(toSend)
            }
        else {
            notify(<p>Fill Out All Fields.</p>, "error")
        }
    }

    goBack = ()=>{
        if(this.state.step !== 1 && this.state.step > 0){
            this.setState({
                step: this.state.step - 1
            })
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render(){


        const { store, products,product_selected,purchase_info,step,processed_purchase_info } = this.state,
        isThereAStore = Boolean(store) === true && Boolean(Object.keys(store).length > 0); 
        
        return <W className='xs-12'>
        <div className="i-h xs-12 sm-10 sm-off-1">
            <div className="c-w i-h">
                <div className="c i-h t-c">
                
                <div className="xs-12 md-6 md-off-3 sm-8 sm-off-2 form-con">

                    { this.state.is_first_load === false &&
                        <Spinner/>
                           
                    }

                    { this.state.is_first_load === true 
                        && <div className="xs-12">
                        {
                            isThereAStore === true ? 
                            
                            <React.Fragment>
                                { 
                                    step === 1 && 
                                        <React.Fragment>

                                            <div className='form-group xs-12'>
                                                <label>Store Name</label>
                                                <h4>{store.name}</h4>
                                            </div>

                                            <div className='form-group xs-12'>
                                                <div className='xs-8'>
                                                    <label>Select a product from the list below</label>
                                                    <select name='products' className='form-control' value={product_selected.product_id} onChange={this.handleProductSelect}>
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
                                        </React.Fragment>
                                }

                                { 
                                    step === 2 && 
                                        
                                        <React.Fragment>
                                            {
                                                this.props.type === storeA.PROCESS_PURCHASE_INFO_REQUEST &&
                                                <Spinner/>

                                            }
                                        
                                            {this.props.type === storeA.PROCESS_PURCHASE_INFO_WENT &&
                                            <React.Fragment>
                                            <div className='xs-12 step-2'>
                                                <div className="xs-12">
                                                    <div className='xs-6'>
                                                        <button onClick={this.goBack} className='btn btn-success'>Back</button>
                                                    </div>
                                                    <div className="xs-6">
                                                        <p id='refresh'>Rates Refreshing in <span>{this.state.count}s</span></p>
                                                    </div>
                                                </div>
                                                <div className='form-group xs-12 bar t-c'>
                                                    <div className='xs-6'>
                                                        <label className='t-c'>Cryptocurrency</label>
                                                        <h4>{purchase_info.cryptocurrency_chosen}</h4>
                                                    </div>
                                                    <div className='xs-6'>
                                                        <label className='t-c'>Current Rate</label>
                                                        <h4>{processed_purchase_info.ether_to_fiat_value}</h4>
                                                    </div>
                                                </div>

                                                <div className='form-group xs-12 bar t-c'>
                                                    <div className='xs-4'>
                                                        <label className='t-c'>Amount Expected</label>
                                                        <h4>{processed_purchase_info.amount_expected}</h4>
                                                    </div>

                                                    <div className='xs-4'>
                                                        <label className='t-c'>Fees Added</label>
                                                        <h4>{processed_purchase_info.actual_fees_added}</h4>
                                                    </div>

                                                    <div className='xs-4'>
                                                        <label className='t-c'>Fees Rate</label>
                                                        <h4>{processed_purchase_info.fee_percentage}%</h4>
                                                    </div>
                                                </div>

                                                <div className='form-group xs-12 bar t-c'>
                                                    <div className='xs-12'>
                                                        <label className='t-c'>Please send the <strong>Amount Expected</strong> to this Address</label>
                                                        <div className="well">340304049340920349230904930</div>
                                                    </div>
                                                </div>   

                                                <div className='form-group xs-12'>
                                                    <div className='xs-12'>
                                                        <button className="form-control btn btn-info" 
                                                        name="Continue" type='submit' 
                                                        onClick={this.handleStepTwo}>Waiting For Transfer</button>
                                                    </div>
                                                </div> 
                                            </div>
                                        </React.Fragment>
                                            }
                                        </React.Fragment>
                                        
                                        
                                }


                            </React.Fragment>

                        :
                        <div className='xs-12 t-c'>
                            <h4> Store Not Found.</h4>
                        </div>
                        
                        }
                     </div>
                    }
                
            
                 
                </div>
                
                <div className='xs-12'>
                    <h5 id='company-logo'>Powered By TakeCoins.</h5>
                 </div>
                
                </div>
            </div>
        </div>
        
        </W>
    }
}

const mapStateToProps = state=>{
    return {
        store: state.store.data,
        processed_purchase_info: state.store.processed_purchase_info,
        store_products: state.store.products,
        type: state.store.type,
        message: state.store.message
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        fetch_store_information :(store)=> dispatch(fetch_store_information(store)),
        process_purchase_information: (obj)=> dispatch(process_purchase_information(obj))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Store);