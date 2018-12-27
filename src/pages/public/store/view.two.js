import React from 'react';
import {connect} from "react-redux";
import Spinner from "../../../components/shared/spinner";
import storeA from '../../../store/actions/store';

class ViewTwo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            processing: true,
            purchase_info: this.props.purchase_info,
            processed_purchase_info: this.props.processed_purchase_info,
            count: this.props.count
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                purchase_info: nextProps.purchase_info,
                processed_purchase_info: nextProps.processed_purchase_info,
                processing: nextProps.type === storeA.PROCESS_PURCHASE_INFO_REQUEST,
                count: nextProps.count
            })
        }
    }

    componentWillUnmount(){
        this.props.clearInterval()
    }

    render(){
        const { processing, purchase_info, processed_purchase_info } = this.state;

        switch (processing) {
            case true:
            return <Spinner/>
        
            default:
            switch (this.props.type) {
                case storeA.PROCESS_PURCHASE_INFO_WENT:
                    return <div className='xs-12 step-2'>
                    <div className="xs-12">
                        <div className='xs-6'>
                            <button onClick={this.props.go_back} className='btn btn-success'>Back</button>
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
                                <h4>{processed_purchase_info.original_money_value}</h4>
                            </div>
                            <div className='xs-6'>
                                <label className='t-c'>Sum + Fees</label>
                                <h4>{processed_purchase_info.amount_expected.in_fiat} </h4>
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
                            <h4>{processed_purchase_info.original_money_value}</h4>
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
                        <div className='xs-12'>
                            <label className='t-c'>Please send the <strong>Amount Expected</strong> to this Address</label>
                            <div className="well">{processed_purchase_info.public_key}</div>
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
}

const mapStateToProps = state =>{
    return {
        processed_purchase_info: state.store.processed_purchase_info,
        type: state.store.type,
        message: state.store.message,
        who_bears_charges: state.store.data.who_bears_charges

    }
}

const mapDispatchToProps = dispatch =>{
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewTwo)