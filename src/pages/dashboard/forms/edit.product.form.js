import React from 'react';
import Form from "../../../styles/form";
import {connect} from "react-redux";
import { update, get_one } from '../../../store/action-creators/product';
import product from '../../../store/actions/product';
import { notify } from '../../../store/action-creators/app';
import { Link } from 'react-router-dom';

class EditProduct extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            price: "",
            currency: "NGN",
            quantity: 1,
            description:""
        }

        props.dispatch(get_one(props.match.params.id))
    }

    handleChange = e=>{
        e.persist();
        const{ value,name} = e.target;

        this.setState({
            [name]: value
        })
    }

    submitForm = e=>{
        e.preventDefault();

        this.props.dispatch(
            update({
                name: this.state.name,
                price: this.state.price,
                currency: this.state.currency,
                description:this.state.description,
                quantity: this.state.quantity
            },
            this.props.match.params.id
            )
        )
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

            if(nextProps.type === product.UPDATE_PRODUCT_FAILED){
                notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
            }

            if(nextProps.type === product.UPDATE_PRODUCT_WENT){
                notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"success");
                nextProps.history.push("/dashboard/products")
            }
            
            if(nextProps.type === product.FIND_SELLER_ONE_PRODUCT_WENT){
            this.setState({
                name: nextProps.one.name,
                price: nextProps.one.price,
                currency: nextProps.one.currency,
                description: nextProps.one.description,
                quantity: nextProps.one.quantity  
            })
        }

        }
    }

    render(){

        return  <div style={{height: "calc(100vh - 60px)", width: '100vw' }}>
            <div className='c-w i-h'>
                <div className='c t-c i-h'>
                
                <div className="xs-10 xs-off-1 sm-8 sm-off-2 md-6 md-off-3">
                
                <div className='form-group'>
                    <Link className="btn btn-info" to="/dashboard/products"> Back </Link>
                </div>
                
                    <Form className="xs-12" onSubmit={this.submitForm}>
                        <div className='form-group'>
                            <label>Product Name</label>
                            <input className="form-control" name="name"
                             value={this.state.name} placeholder="Product Name"
                              onChange={this.handleChange} required/>
                        </div>
                        
                        <div className='form-group'>
                        <label>Product Price</label>
                          
                            <input className="form-control" name="price" 
                            value={this.state.price} 
                             type="text" placeholder="Product Price" required onChange={this.handleChange}/>
                        </div>

                        <div className='form-group'>
                        <label>Product Quantity</label>
                          
                            <input className="form-control" name="quantity"
                            value={this.state.quantity}   type="number" placeholder="Product Quantity" required onChange={this.handleChange}/>
                        </div>

                        <div className='form-group'>
                        <label>Price Currency</label>
                          
                            <select className="form-control"
                            value={this.state.currency} 
                            name="currency" placeholder="Currency"
                             required onChange={this.handleChange}>
                                   <option value="NGN"> NGN</option>
                                {/* <option value="USD"> USD</option> */}
                             
                            </select>
                        </div>
                        
                        <div className='form-group'>
                        <label>Product Description</label>
                          
                            <textarea className="form-control"
                            value={this.state.description} 
                            name="description" placeholder="Product Description" required onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <input className="form-control btn btn-success" name="submit"  type='submit'
                            value="Update"
                            />
                        </div>    
                    </Form>
                </div>
                </div>
            </div>
        </div>
        
    }
}

const mapStateToProps = state =>{
    return {
        type: state.product.type,
        message: state.product.message,
        one: state.product.one,
    }
}

export default connect(mapStateToProps)(EditProduct)