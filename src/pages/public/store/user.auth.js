import React from 'react';
import {connect} from 'react-redux';
import { signin,signup,plain_clear } from '../../../store/action-creators/auth';
import { notify } from '../../../store/action-creators/app';
// import store from '../../../store/actions/store';
// import Spinner from "../../../components/shared/spinner";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import auth from '../../../store/actions/auth';
import { retrieveToken } from '../../../helpers/TokenManager';

class UserLogin extends React.Component{
    constructor(props){
        super(props);
        props.plain_clear();
        this.state = {
            isSignedIn: false,
            isSignedUp: false,
            
            email:"",
            phone_number:"",
            name:"",
            verify_password:"",
            password:"",
            mode: "login"
    }
}

componentWillMount(){
    if(Boolean(retrieveToken()) === true) {
        return this.props.proceed(0)
    }else{
        return this.props.proceed(1)
    }
}

handleChange=e=>{
    e.persist();
    this.setState({
        [e.target.name]: e.target.value,
        message: ""
    })
}

componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
            
        if(nextProps.auth_type === auth.SIGNIN_FAILED){
                notify(<p style={{color: 'white'}}>{nextProps.auth_message}</p>,"error")
            }

            if(nextProps.auth_type === auth.SIGNIN_SUCCESSFUL && this.state.isSignedIn === false ){
                this.setState({
                    isSignedIn: true
                },()=>{
                    notify(<p style={{color: 'white'}}> {nextProps.auth_message}</p>,"success")
                     nextProps.proceed(2);    
                })
            }

            if(nextProps.auth_type === auth.SIGNUP_FAILED){
                notify(<p style={{color: 'white'}}>{nextProps.auth_message}</p>,"error")
            }

            if(nextProps.auth_type === auth.SIGNUP_SUCCESSFUL && this.state.isSignedUp === false){
                
                this.setState({
                    isSignedUp: true
                },()=>{
                    notify(<p style={{color: 'white'}}> {nextProps.auth_message}</p>,"success")
                    nextProps.proceed(2);    
                })
            
            }
        }
}

signin = (e) => {
    e.preventDefault();
        this.props.signin({
            any: this.state.email,
            password: this.state.password,
            attempting_to_buy: true
        })
}


signup = (e) => {
    e.preventDefault();
    this.props.signup({
        email: this.state.email,
        password: this.state.password,
        phone_number:this.state.phone_number,
        name:this.state.name,
        verify_password:this.state.verify_password,
        role: "Buyer"
    })
}

render(){

    switch (this.state.mode) {
        case "signup":
            
        return <form className='step-0 xs-12' onSubmit={this.signup}>
        <p>Please Sign Up To Continue With The Purchase.</p>
        <div className='form-group xs-12'>

                <div className='xs-12'>
                    <label>Phone Number</label>
                        <input  
                            className='form-control' 
                            name='phone_number' 
                            type='tel'
                            placeholder="Your Phone Number"
                            onChange={this.handleChange}
                            value={this.state.phone_number}
                            required
                        />
                </div>
                </div>

                <div className='form-group xs-12'> 
                    <div className='xs-12'>
                        <label>Email Address</label>
                        <input type='text' 
                        className='form-control' 
                        name='email' 
                        placeholder="Your Email Address"
                        onChange={this.handleChange}
                        value={this.state.email}
                    required
                        />
                    </div>
                </div>

                <div className='form-group xs-12'>
                    <div className='xs-12'>
                        <label>Full Name</label>
                        <input type='text' 
                        className='form-control' 
                        name='name' 
                        placeholder="Your Full Name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        required
                        />
                    </div>
                </div>
                

            <div className='form-group xs-12'>
                <div className='xs-12'>
                    <label>Password</label>
                    <input 
                    type='password' 
                    className='form-control' 
                    name='password' 
                    placeholder="Your Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                    />
                </div>
            </div>
            <div className='form-group xs-12'>
                <div className='xs-12'>
                    <label>Verify Password</label>
                    <input 
                    type='password' 
                    className='form-control' 
                    name='verify_password' 
                    value={this.state.verify_password}
                    placeholder="Re-enter Password"
                    onChange={this.handleChange}
                    required
                    />
                </div>
            </div>

            <div className='form-group xs-12'>
                <div className='xs-12'>
                    <button className="form-control btn btn-info" 
                    name="Continue" type='submit'>Continue</button>
                </div>
            </div>

            <div className="form-group t-c xs-12">
                <Link to="#" onClick={()=>this.setState({mode: "signin"})}> Sign into your account  </Link>
            </div>
    
        </form>

        default:
        return <form className='step-0 xs-12' onSubmit={this.signin}>
        <p>Please Sign In To Continue With The Purchase.</p>
        
        <div className='form-group xs-12'>
        
            <div className='xs-12'>
                <label>Email</label>
                <input type='email' 
                className='form-control' 
                name='email' 
                placeholder="Your Email Address"
                onChange={this.handleChange}
                 
                required
                />
            </div>

        </div>

        <div className='form-group xs-12'>
            <div className='xs-12'>
                <label>Password</label>
                <input 
                type='password' 
                className='form-control' 
                name='password' 
                placeholder="Your Password"
                onChange={this.handleChange} 
                required
                />
                </div>
        </div>

        <div className='form-group xs-12'>
            <div className='xs-12'>
                <button className="form-control btn btn-info" 
                name="Continue" type='submit' >Continue</button>
            </div>
        </div>


        <div className="form-group t-c xs-12">
                <Link to="#" onClick={()=>this.setState({mode: "signup"})}> Signup for an account  </Link>
        </div>

    </form>

    }
      
    }
}


const mapStateToProps = state=>{
    return {
        store: state.store.data,
        store_products: state.store.products,
        type: state.store.type,
        message: state.store.message,

        auth_message: state.auth.message,
        auth_type: state.auth.type
  
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        signin :(obj)=> dispatch(signin(obj)),
        signup :(obj)=> dispatch(signup(obj)),
        plain_clear: ()=>dispatch(plain_clear())
        
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(UserLogin));
   