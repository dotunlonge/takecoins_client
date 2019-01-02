import React from 'react';
import {connect} from 'react-redux';
import ViewOne from './transaction.make';
import ViewTwo from "./transaction.waiting";
import W from '../../../styles/store';
import UserLogin from './user.auth';
import TransactionConfirmed from './transaction.confirmed';


const View = ({step})=>{
    switch (step) {

        case 3:
        return <TransactionConfirmed />

        case 2:
            return <ViewTwo />

        case 1: 
            return <UserLogin />

        default:
            return <ViewOne />

    }
}

const mapStateToProps = state=>{
    return {
        step: state.store.step,
    }
}

export default connect(mapStateToProps)(({step})=>{
    return <W className='xs-12'>
    <div className="i-h xs-12 sm-10 sm-off-1">
        <div className="c-w i-h">
            <div className="c i-h t-c">
                <div className="xs-12 md-6 md-off-3 sm-8 sm-off-2 form-con">
                    <View step={step}/>
                </div>
                <div className='xs-12'>
                    <h5 id='company-logo'>Powered By TakeCoins.</h5>
                </div>
            </div>
        </div>
    </div>
    </W>
});