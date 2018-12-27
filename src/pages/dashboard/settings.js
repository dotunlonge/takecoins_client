import React from 'react';
import SET from "../../styles/settings";
import { get_api_key } from '../../store/action-creators/settings';
import {connect} from 'react-redux';


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
            account_number:"", account_name:"", bank_name:"", who_bears_charges:"", get_paid_in:""
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            const { account_number, account_name, bank_name, who_bears_charges, get_paid_in } = nextProps.user_store_details;
            this.setState({
                account_number, account_name, bank_name, who_bears_charges, get_paid_in
            })
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

    }

    render(){
        const {who_bears_charges, get_paid_in, bank_name, account_name, account_number} = this.state;

        return <SET className='xs-12'>
        <div className='xs-12 contain'>
            <form className='xs-10 xs-off-1 sm-6 sm-off-3 pad'>
                
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
                        {/* <option value="Store"> In Cryptocurrency </option> */}
                        <option value="Fiat"> In Fiat </option>
                    </select>
                </div>

                <div className="form-group">
                    <label> Account Number </label>
                    <input name='account_number' className='form-control' value={account_number} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label> Account Name </label>
                    <input name='account_name' className='form-control' value={account_name} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label> Bank Name </label>
                    <select name= 'bank_name' className="form-control" value={bank_name} onChange={this.handleChange}>
                        {banks.map((b,i)=>{
                            return <option value={b.code}>{b.name}</option>
                        })}
                    </select>
                </div>
                
                <div className='form-group'>
                        <input className='btn btn-success' name='submit' value="Save"/>
                    </div>
            </form>
            </div>
        </SET>
    }
}

const mapStateToProps = state =>{
    return {
        credentials: state.settings.api_credentials,
        user_store_details: state.auth.credentials.store || {}
    }
}
export default connect(mapStateToProps)( DashSettings );