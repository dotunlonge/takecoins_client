import React from 'react';
import SET from "../../../styles/settings";
import { get_api_key,get_your_settings, update_settings } from '../../../store/action-creators/settings';
import {connect} from 'react-redux';
import { notify } from '../../../store/action-creators/app';
import settings from '../../../store/actions/settings';

const banks = [
    { "id": "1", "name": "Access Bank" ,"code":"044" },
    { "id": "2", "name": "Citibank","code":"023" },
    { "id": "3", "name": "Diamond Bank","code":"063" },
    { "id": "4", "name": "Dynamic Standard Bank","code":"" },
    { "id": "5", "name": "Ecobank Nigeria","code":"050" },
    { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
    { "id": "7", "name": "First Bank of Nigeria","code":"011" },
    { "id": "8", "name": "First City Monument Bank","code":"214" },
    { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
    { "id": "10", "name": "Heritage Bank Plc","code":"030" },
    { "id": "11", "name": "Jaiz Bank","code":"301" },
    { "id": "12", "name": "Keystone Bank Limited","code":"082" },
    { "id": "13", "name": "Providus Bank Plc","code":"101" },
    { "id": "14", "name": "Skye Bank","code":"076" },
    { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
    { "id": "16", "name": "Standard Chartered Bank","code":"068" },
    { "id": "17", "name": "Sterling Bank","code":"232" },
    { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
    { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
    { "id": "20", "name": "United Bank for Africa","code":"033" },
    { "id": "21", "name": "Unity Bank Plc","code":"215" },
    { "id": "22", "name": "Wema Bank","code":"035" },
    { "id": "23", "name": "Zenith Bank","code":"057" }
];


class DashSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bank_account_number:"",
            bank_account_name:"",
            who_bears_charges: "",
            get_paid_in:"Store", 
            ethereum_address: "",
            bitcoin_address: "",
            bank_name: banks[0].code
        }
    }

    componentWillMount(){

        this.setState({
            who_bears_charges: this.props.who_bears_charges,
            get_paid_in: this.props.get_paid_in,
            ethereum_address: this.props.ethereum_address || '',
            bitcoin_address: this.props.bitcoin_address || '',
            bank_account_number: this.props.bank_account_number,
            bank_account_name: this.props.bank_account_name,
            bank_name: this.props.bank_name
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            
            if(nextProps.type === settings.UPDATE_YOUR_SETTINGS_WENT){
                console.log("success")
                notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success")
            }

            if(nextProps.type === settings.UPDATE_YOUR_SETTINGS_FAILED){
                console.log("error")
                notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"error");
            }
            
        }
    }

    getAPIKeys = ()=>{
        this.props.dispatch(get_api_key())
    }

    handleChange=e=>{
        e.persist();
        this.setState({
            [e.target.name]: e.target.value,
            message: ""
        })
    }
    
    handleSubmit = e =>{
        e.preventDefault();
        this.props.update_your_settings({
            who_bears_charges: this.state.who_bears_charges,
            accept_payments_in_fiat: this.state.get_paid_in  === "Fiat",
            ethereum_address: this.state.ethereum_address,
            bitcoin_address: this.state.bitcoin_address,
            bank_account_number: this.state.bank_account_number,
            bank_account_name: this.state.bank_account_name,
            bank_name: this.state.bank_name

        })
    }

    render(){
        const {
                who_bears_charges,
                get_paid_in,
                bank_name,
                bank_account_name,
                bank_account_number,
                ethereum_address,
                bitcoin_address
            } = this.state;


        return <SET className='xs-12'>
        <div className='xs-12 contain'>
            <form className='xs-10 xs-off-1 sm-6 sm-off-3 pad' onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <label>Who Should Bear The Fees ?</label>
                    <select name="who_bears_charges" className="form-control" value={who_bears_charges} onChange={this.handleChange}>
                        <option value="Store"> I Bear The Charges </option>
                        <option value="Customer"> The Customer Bears The Charges </option>
                    </select>
                </div>

                <div className="form-group">
                
                    <label>How Would You Like To Get Paid ?</label>
                    <select name="get_paid_in" className="form-control" value={get_paid_in} onChange={this.handleChange}>
                        <option value="Crypto"> In Cryptocurrency </option>
                        <option value="Fiat"> In Fiat </option>
                    </select>
                </div>
                {this.state.get_paid_in === "Crypto" &&
                <React.Fragment>
                    <div className="form-group">
                        <label> Ethereum Address </label>
                        <input name='ethereum_address' className='form-control' value={ethereum_address} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label> Bitcoin Address </label>
                        <input name='bitcoin_address' className='form-control' value={bitcoin_address} onChange={this.handleChange}/>
                    </div>
                </React.Fragment>
                }

                {this.state.get_paid_in === "Fiat" && 
                <React.Fragment>
                
                    <div className="form-group">
                        <label> Account Number </label>
                        <input name='bank_account_number' className='form-control' value={bank_account_number} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label> Account Name </label>
                        <input name='bank_account_name' className='form-control' value={bank_account_name} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label> Bank Name </label>
                        <select name= 'bank_name' className="form-control" value={bank_name} onChange={this.handleChange}>
                            {banks.map((b,i)=>{
                                return <option value={b.code} key={i}>{b.name}</option>
                            })}
                        </select>
                    </div>
                
                </React.Fragment>
             
                }

                <div className='form-group'>
                        <button className='btn btn-success' name='submit' type='submit'> Save </button>
                    </div>
            </form>
            </div>
        </SET>
    }
}

const mapStateToProps = state =>{

    const {
        bank_name, bank_account_name, bank_account_number,
        accept_payments_in_fiat,  ethereum_address,
        bitcoin_address
    } = state.auth.credentials;

    const {
        who_bears_charges
    } = state.auth.credentials.store;

    return {
        credentials: state.settings.api_credentials,
        user_store_details: state.auth.credentials.store || {},
        
        type: state.settings.type,
        message: state.settings.message,

        who_bears_charges,
        get_paid_in: accept_payments_in_fiat === true ? "Fiat": "Crypto",
        ethereum_address,
        bitcoin_address,
        bank_account_name,
        bank_account_number,
        bank_name
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        get_your_settings: ()=> dispatch( get_your_settings()),
        update_your_settings: obj => dispatch( update_settings(obj))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( DashSettings );