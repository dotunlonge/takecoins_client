import React from "react";
import s from "styled-components";
import {connect} from 'react-redux';
import Spinner from "../../../components/shared/spinner";
import { withRouter } from 'react-router';
import { continue_listening_for_transaction, update_step } from "../../../store/action-creators/store";
import store from "../../../store/actions/store";

const W = s.div``;

class TransactionConfirmed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: "",
            transaction_details: {},
            isExactAmount: false
        }    
    }

    componentDidMount(){
        let id = this.props.processed_purchase_info.transaction_id;
        if(id){
            this.props.continue_listening({
                transaction_id: this.props.processed_purchase_info.transaction_id
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if( this.props !== nextProps ){
            this.setState({
                transaction_details: nextProps.transaction_details,
                purchase_info: nextProps.purchase_info,
                processed_purchase_info: nextProps.processed_purchase_info,
                count: nextProps.count,
                type: nextProps.type
            })
        }
    }

    go_back = () => {
        this.props.update_step(0);
    }
    
    render(){
        const {type, transaction_details } = this.state;
      
        switch(type){
            case store.FIND_FULL_TX_SUCCESSFUL:
                return <W className='xs-12 step-2'>
                    {
                        transaction_details.isExactAmount === true ?
                            <React.Fragment>
                                <h3> Awesome!  </h3>
                                <p style={{textAlign: "left"}}> Your Transaction Was Succesful, The Seller Has Been Alerted. </p>

                                <button onClick={this.go_back} className="btn btn-success">Go Back</button>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <h3> Oops </h3>
                                <p style={{textAlign: "left"}}> It seems you sent the wront amount the transaction has been reversed and should reflect back in your account shortly.</p>
                                <button onClick={this.go_back} className="btn btn-success">Go Back</button>
                           
                            </React.Fragment>   
                    }
                    
                </W>
            

            case store.FIND_FULL_TX_FAILED:    
                return <div className='xs-12 t-c'>
                    <h4> {this.props.message}</h4>
                    <p>Please Refresh The Page.</p>
                </div>
        
            default:
                return <W className='xs-12 step-2'>
                    <Spinner/>
                    <p> Almost There... :) </p>
                </W>
                
    }
    }
}

const mapStateToProps = state =>{
    return {
        transaction_details: state.store.transaction_details,
        processed_purchase_info: state.store.processed_purchase_info,
        type: state.store.type,
        message: state.store.message
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        continue_listening: (obj)=> dispatch(continue_listening_for_transaction(obj)),
        update_step: (step)=>dispatch(update_step(step))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(TransactionConfirmed ));