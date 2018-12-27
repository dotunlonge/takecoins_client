import React from 'react';
import {connect} from 'react-redux';
import { process_purchase_information } from '../../../store/action-creators/store';
import config from '../../../config';
import ViewOne from './view.one';
import ViewTwo from "./view.two";
import W from '../../../styles/store';
import UserLogin from './user.auth';
import { retrieveToken } from '../../../helpers/TokenManager';
import auth from '../../../store/actions/auth';

class Store extends React.Component{
    constructor(props){
    super(props);
        this.state = {
            step: 0,
            isSignedIn: Boolean(retrieveToken()) ? true:false,
            count: config.REFRESH_TIME_IN_SECONDS,
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.auth_type === auth.SIGNIN_SUCCESSFUL && this.state.isSignedIn === false){
                this.setState({
                    isSignedIn: true,
                    step: 2
                })
            }
            if(nextProps.auth_type === auth.SIGNUP_SUCCESSFUL && this.state.isSignedIn === false){
                this.setState({
                    isSignedIn: true,
                    step: 2
                })
            }
            
        }
    }

    actual_process = (obj)=>{
        const ob = obj || this.state.purchase_info; 
        this.props.process_purchase_information(ob)
            
        // this.intervalId = setInterval(()=>{
            
        //     if(Boolean(this.props.transaction_id)){
        //         ob.transaction_id = this.props.transaction_id
        //     }
            
        //     this.setState(p=>{
        //         if(p.count === 1){
        //             this.props.process_purchase_information(ob)
        //             return {
        //                 count: config.REFRESH_TIME_IN_SECONDS,
        //             }
        //         }else{
        //     return { 
        //         count: p.count - 1
        //     }
        //     }
        //     })
        // },1000);
    }

    process_info = (obj)=>{
        this.setState({
            step: Boolean(retrieveToken()) === true ? 2:1,
            purchase_info: obj
        })
        if(Boolean(retrieveToken()) === true){
            this.actual_process(obj);
        }
    }

    go_back = ()=>{
        clearInterval(this.intervalId);
            this.setState({
                step: 0
            })
    }

    proceed =(value)=>{
        this.setState({
            step: value ? value: 2
        },()=>{
            if(Boolean(retrieveToken()) === true ){
                if(this.state.step === 2){
                    return this.actual_process();    
                }
                if(value === 2){
                    return this.actual_process();    
                    
                }
            }
        })
    }

    
    render(){
        
        const View = ()=>{
            switch (this.state.step) {
                case 2:                
                    return <ViewTwo count={this.state.count} 
                    purchase_info = {this.state.purchase_info} 
                    go_back={this.go_back} clearInterval= {()=>{
                        clearInterval(this.intervalId)
                    }}/>
    
                case 1: 
                    return <UserLogin proceed = {this.proceed} />
    
                default:
                    return <ViewOne process_info={this.process_info} 
                    purchase_info ={this.state.purchase_info}/>
                ;
            }
        }
        return <W className='xs-12'>
        <div className="i-h xs-12 sm-10 sm-off-1">
            <div className="c-w i-h">
                <div className="c i-h t-c">
                <div className="xs-12 md-6 md-off-3 sm-8 sm-off-2 form-con">
                        {View()}
                 </div>
                 <div className='xs-12'>
                    <h5 id='company-logo'>Powered By TakeCoins.</h5>
                 </div>
                 
                 </div></div></div>
        </W>
    }
}

const mapStateToProps = state=>{
    return {
        type: state.store.type,
        message: state.store.message,
        auth_type: state.auth.type,
        transaction_id: state.store.processed_purchase_info.transaction_id
  
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        process_purchase_information: (obj)=> dispatch(process_purchase_information(obj))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Store);