import React, { Component } from 'react';
import Form from "../../styles/form";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { signin } from '../../store/action-creators/auth';
import { notify } from '../../store/action-creators/app';
import auth from '../../store/actions/auth';

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            any:'',
            password:''
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.type === auth.SIGNIN_FAILED)
                notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
            if(nextProps.type === auth.SIGNIN_SUCCESSFUL)
                notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"success")
        }
    }

    handleChange=e=>{
        e.persist();
        this.setState({
            [e.target.name]: e.target.value,
            message: ""
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(
            signin({
                any: this.state.any,
                password: this.state.password
            })
        )
    }


  render() {

    return (
     <div className="xs-12 full">
     <div className="c-w i-h">
      <div className="c i-h t-c">
        <div className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4">

        <Form className="xs-12" onSubmit={this.submitForm}>
            <div className="xs-12">
                
                <div className="form-group">
                    <input className="form-control" 
                    name="any" type='text' 
                    placeholder="Email Address Or Username" 
                    required onChange={this.handleChange}/>
                </div>
                
                <div className="form-group">
                    <input className="form-control" name="password"
                    type='password' placeholder="Password"
                    required onChange={this.handleChange}/>
                </div>


                <div className="form-group">
                    <input className="form-control btn  btn-success" type="submit" value="Log in"/>
                </div>

                <div className="form-group">
                    <Link to="/register"> Signup for an account  </Link>
                </div>


                <div className="form-group">
                    <Link to="/forgot/password"> Forgot your passworrd ?  </Link>
                </div>


            </div>
        </Form>

        </div>
      </div>
     </div>
     </div>
      );
  }
}

const mapStateToProps = state =>{
    return {
        message: state.auth.message,
        type: state.auth.type
    }
}

export default  connect(mapStateToProps)(Login);
