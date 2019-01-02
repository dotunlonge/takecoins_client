import React, { Component } from 'react';
import Form from "../../styles/form";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { signup } from '../../store/action-creators/auth';
import { notify } from '../../store/action-creators/app';
import auth from '../../store/actions/auth';

class Register extends Component {

  constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        verify_password: "",
        store_name: "",
        address: "",
        name: '',
        phone_number: '',
        role: 'Buyer'
    }
}

componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
        if(nextProps.type === auth.SIGNUP_FAILED){
            notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
        }
        if(nextProps.type === auth.SIGNUP_SUCCESSFUL){
            notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"success");
            nextProps.history.push("/dashboard")
        }
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
        signup({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            verify_password: this.state.verify_password,
            store_name: this.state.store_name,
            phone_number: this.state.phone_number,
            address: this.state.address,
            role: this.state.role
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
                <label className='t-l'>I am a </label>
                    <select className="form-control" name="role"
                    required onChange={this.handleChange}>
                    <option value={"Buyer"}>Buyer</option>
                    <option value={"Seller"}>Seller</option>
                    </select>
                </div>


            <div className="form-group">
              <input className="form-control" 
              name="name" type='text' 
              placeholder="Full Name" 
              required onChange={this.handleChange}/>
            </div>

            {this.state.role === "Buyer" &&
                <React.Fragment>
                    <div className='form-group  xs-12'>
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
                    
                    <div className='form-group xs-12'> 
                        <div className='xs-12'>
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
                            <textarea 
                                type='text' 
                                className='form-control' 
                                name='address' 
                                placeholder="Your Address"
                                onChange={this.handleChange}
                                value={this.state.address}
                                required
                            />
                        </div>
                    </div>
                    
                </React.Fragment>
            }

            
            {this.state.role === "Seller" && 
                <React.Fragment>
                    <div className="form-group">
                        <input className="form-control" 
                        name="email" type='email' 
                        placeholder="Email Address" 
                        required onChange={this.handleChange}/>
                    </div>

                <div className="form-group">
                    <input className="form-control" name="store_name"
                    type='text' placeholder="Your Store Name"
                    value={this.state.store_name}
                    required onChange={this.handleChange}/>
                </div>
                </React.Fragment>
            }

                <div className="form-group">
                    <input className="form-control" name="password"
                    type='password' placeholder="Password"
                    required onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <input className="form-control" name="verify_password"
                    type='password' placeholder="Verify Password"
                    required onChange={this.handleChange}/>
                </div>


            <div className="form-group">
              <input className="form-control btn  btn-success"
               name="email"  type="submit" value="Register"/>
            </div>

            <div className="form-group">
              <Link to="/login"> Log in to your account  </Link>
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

export default  connect(mapStateToProps)(Register);
