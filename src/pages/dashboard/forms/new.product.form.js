import React from 'react';
import Form from "../../../styles/form";
import {connect} from "react-redux";
import { add } from '../../../store/action-creators/product';
import product from '../../../store/actions/product';
import { notify } from '../../../store/action-creators/app';
import { Link } from 'react-router-dom';


class NewProduct extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: "",
            price: "",
            currency: "NGN",
            quantity: 1,
            description:""
        }
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
            add({
                name: this.state.name,
                price: this.state.price,
                currency: this.state.currency,
                description:this.state.description,
                quantity: this.state.quantity
            })
        )
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.type === product.ADD_PRODUCT_FAILED){
                notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
            }
            if(nextProps.type === product.ADD_PRODUCT_WENT){
                notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"success");
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
                        
                            <input className="form-control" name="name" placeholder="Product Name" onChange={this.handleChange} required/>
                        </div>
                        
                        <div className='form-group'>
                        <label>Product Price</label>
                        
                            <input className="form-control" name="price"  type="text" placeholder="Product Price" required onChange={this.handleChange}/>
                        </div>

                        <div className='form-group'>
                        <label>Product Quantity</label>
                       
                            <input className="form-control" name="quantity"  type="number" placeholder="Product Quantity" required onChange={this.handleChange}/>
                        </div>

                        <div className='form-group'>
                        <label>Price Currency</label>
                        
                            <select className="form-control" name="currency" placeholder="Currency" required onChange={this.handleChange}>
                                <option value="NGN"> NGN</option>
                                <option value="USD"> USD</option>
                                
                            </select>
                        </div>
                        
                        <div className='form-group'>
                        <label>Product Description</label>
                       
                            <textarea className="form-control" name="description" placeholder="Product Description" onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <input className="form-control btn btn-success" name="submit"  type='submit'
                            value="Add"
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
        message: state.product.message
    }
}

export default connect(mapStateToProps)(NewProduct)