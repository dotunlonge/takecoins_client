import React from 'react';
import {connect} from "react-redux";
import Spinner from "../../../components/shared/spinner";
import storeA from '../../../store/actions/store';
import Icon from "react-fa";
import { start_listening_for_transaction, process_purchase_information, update_step } from '../../../store/action-creators/store';
import config from '../../../config';

class ViewTwo extends React.Component{
    constructor(props){
        props.process_purchase_information(props.obj_to_send);
        super(props);
        
        this.state = {
            relevant_action_type: "",
            count: config.REFRESH_TIME_IN_SECONDS,
            loaded: false,
            big_error: false,
            obj_to_send: this.props.obj_to_send,
            processed_purchase_info: this.props.processed_purchase_info,
            found_transaction: this.props.found_transaction
        }

    }

    start_refreshing_sequence = ()=>{
        let obj_to_send = this.props.obj_to_send;


        this.intervalId = setInterval(()=>{
            
            if( Boolean(this.props.transaction_id) )
                obj_to_send.transaction_id = this.props.processed_purchase_info.transaction_id
        
            
            this.setState(p=>{

                if(p.count === 1){
                   
                    this.props.process_purchase_information(obj_to_send)
                        return {
                            big_error: false,
                            count: config.REFRESH_TIME_IN_SECONDS,
                        }
                }

                else {
                    return { 
                        count: p.count - 1
                    }
                }

            })
        },1000);
    }

    go_back = () => {
        clearInterval(this.intervalId);
        this.props.update_step(0);
    }

    retry = () => {
        this.props.process_purchase_information(this.state.obj_to_send);
        this.setState({
            big_error: false
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

             if(nextProps.type === storeA.PROCESS_PURCHASE_INFO_WENT){
                 clearInterval(this.intervalId);

                 this.setState({
                     count: config.REFRESH_TIME_IN_SECONDS,
                     big_error: false,
                     relevant_action_type: storeA.PROCESS_PURCHASE_INFO_WENT
                 },()=>{
                    
                     this.start_refreshing_sequence();
                    nextProps.start_listening({
                        transaction_id: nextProps.processed_purchase_info.transaction_id
                    })

                 })
             }

             if(nextProps.type === storeA.PROCESS_PURCHASE_INFO_REQUEST){
                 this.setState({
                     relevant_action_type: storeA.PROCESS_PURCHASE_INFO_REQUEST
                 })
             }
             
             if(nextProps.type === storeA.PROCESS_PURCHASE_INFO_FAILED){
                this.setState({
                    relevant_action_type: storeA.PROCESS_PURCHASE_INFO_FAILED
                })
            }
            
            if(nextProps.type === storeA.FIND_TX_HASH_SUCCESSFUL){
                    clearInterval(this.intervalId);
                    this.setState({
                        big_error: this.state.found_transaction === false
                    },()=>{
                        if(this.state.found_transaction === true){
                            nextProps.update_step(3);
                        }
                    })
            }

            if(nextProps.type === storeA.FIND_TX_HASH_FAILED){
                this.setState({
                    big_error: this.state.found_transaction === false
                })
            }

            this.setState({
                obj_to_send: nextProps.obj_to_send,
                processed_purchase_info: nextProps.processed_purchase_info,
                type: nextProps.type,
                found_transaction: nextProps.found_transaction  
            })

        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    render(){

        const {  
            obj_to_send,
            processed_purchase_info,
            relevant_action_type,
            found_transaction,
            count
        } = this.state;

        switch (relevant_action_type) {

            case storeA.PROCESS_PURCHASE_INFO_WENT:
                if(this.state.big_error === true){
                    return found_transaction === false && <div className='xs-12 step-2'>
                    <h3>Error From Us.</h3>
                    <p style={{textAlign: "left"}}>Please Click Below To Retry Transaction </p>
                    <button className='btn btn-success' onClick={ this.retry }>Retry</button>
                </div>                  
                }
                return <div className='xs-12 step-2'>
                <div className="xs-12">
                    <div className='xs-6'>
                        <button onClick={this.go_back} className='btn btn-success'>Back</button>
                    </div>
                    <div className="xs-6">
                        <p id='refresh'>Rates Refreshing in <span>{ count }s</span></p>
                    </div>
                </div>
                <div className='form-group xs-12 bar t-c'>
                    <div className='xs-6'>
                        <label className='t-c'>Cryptocurrency</label>
                        <h4>{obj_to_send.cryptocurrency_chosen}</h4>
                    </div>
                    <div className='xs-6'>
                        <label className='t-c'>Current Rate</label>
                        <h4>{processed_purchase_info.ether_to_fiat_value.value}
                            <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block"}}>
                            {processed_purchase_info.ether_to_fiat_value.conversion}
                            </span>
                        </h4>
                    </div>
                </div>

                {this.props.who_bears_charges === "Customer" ?
                <React.Fragment>

                    <div className='form-group xs-12 bar t-c'>
                        <div className='xs-6'>
                            <label className='t-c'>Original Sum</label>

                            <h4>
                                {processed_purchase_info.original_money_value}
                                
                                <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block"}}>
                                {processed_purchase_info.amount_expected.fiat}
                                </span>

                            </h4>
                            
                        </div>
                        <div className='xs-6'>
                            <label className='t-c'>Sum + Fees</label>

                            <h4>
                                {processed_purchase_info.amount_expected.in_fiat} | {processed_purchase_info.actual_fees_in_crypto}
                                
                                <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block"}}>
                                {processed_purchase_info.amount_expected.fiat} | {processed_purchase_info.amount_expected.coin}
                                </span>

                                </h4>
                            
                        </div>
                    </div>

                    <div className='form-group xs-12 bar t-c'>
                        <div className='xs-6'>
                        <label className='t-c'>Amount Expected</label>
                        <h4>{processed_purchase_info.amount_expected.in_crypto} 
                            <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block" }}>
                            {processed_purchase_info.amount_expected.coin} </span>
                        </h4>
                    </div>

                    <div className='xs-6'>
                        <label className='t-c'>Fees Rate</label>
                        <h4>{processed_purchase_info.fee_percentage}%
                        <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block" }}> + {processed_purchase_info.fixed_fee}</span>
                        </h4>
                    
                    </div>
                </div>
                </React.Fragment>
                :
                <React.Fragment>
                <div className='form-group xs-12 bar t-c'>
                    <div className='xs-6'>
                        <label className='t-c'>Sum Price</label>
                        <h4>{processed_purchase_info.original_money_value}
                        <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block"}}>
                            {processed_purchase_info.amount_expected.fiat}
                            </span>
                        </h4>
                        
                    </div>

                    <div className='xs-6'>
                        <label className='t-c'>Amount Expected</label>
                        <h4>{processed_purchase_info.amount_expected.in_crypto} 
                            <span style={{color: "slateblue", fontSize: "11.5px", paddingTop: "5px", display:"block" }}>
                            {processed_purchase_info.amount_expected.coin} </span>
                        </h4>
                    </div>
            </div> 
            </React.Fragment>
                }


                <div className='form-group xs-12 bar t-c'>
                    <div className='xs-10 xs-off-1'>
                        <label className='t-c'>Please send the <strong>Amount Expected</strong> to this Address</label>
                        <div className="well">{processed_purchase_info.public_key}</div>
                    </div>
                </div>   

                <div className='form-group xs-12'>
                    <div className='xs-10 xs-off-1'>
                        <button className="form-control btn btn-info" 
                        name="Continue" type='submit' 
                        onClick={this.handleStepTwo}>Waiting To Detect Transfer <Icon name='spinner' spin/> </button>
                    </div>
                </div> 
            </div>
    
            case storeA.PROCESS_PURCHASE_INFO_FAILED:    
                return <div className='xs-12 t-c'>
                    <h4> {this.props.message}</h4>
                    <p>Please Refresh The Page.</p>
                </div>
        
            default:
                return <Spinner/>

        }
        
    }
}

const mapStateToProps = state =>{

    return {

        obj_to_send: state.store.obj_to_send,
        processed_purchase_info: state.store.processed_purchase_info,
        type: state.store.type,
        message: state.store.message,
        found_transaction: state.store.found_transaction,
        who_bears_charges: state.store.data.who_bears_charges

    }

}

const mapDispatchToProps = dispatch =>{
    return {

            start_listening: (obj)=> dispatch(start_listening_for_transaction(obj)),
            process_purchase_information: (obj)=> dispatch(process_purchase_information(obj)),
            update_step: (step)=>dispatch(update_step(step))

        }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewTwo)