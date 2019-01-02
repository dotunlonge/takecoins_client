import React from 'react';
import moment from "moment";
import Tw from "./style";

export default class Table extends React.Component{
    render(){
        return (
        <Tw className="xs-12">
            <div className="f-r">
                <div className="form-group">
                    <label>Filter: </label>
                    <select name="showOnly" id="showOnly">
                        <option value=""> Show Everything </option>
                        <option value=""> Show Only Delivered </option>
                        <option value=""> Show Only Not Delivered </option>
                        
                    </select>
                </div>
            </div>
        <div className="xs-12">
            <h4 id="details">Details</h4>
            <div className="xs-12 sm-3 th">
                <h5>Buyer</h5>
            </div>
            <div className="xs-12 sm-3 th">
                <h5> Product </h5>
            </div>
            <div className="xs-12 sm-3 th">
                <h5> Transaction </h5>
            </div>   

            <div className="xs-12 sm-3 th">
                <h5> Resolutions </h5>
            </div>   
            
        </div>

        {this.props.data.map((datum,index)=>{
            return <div className='xs-12 rowed' key={index}>
            <div className="xs-12 sm-3 td">
                    <label>Buyer Name</label>
                    <p>{datum.buyer.name}</p>
                    <label>Buyer Address</label>
                    <p> {datum.buyer.address}</p>

                    <label>Buyer Email</label>
                    <p>{datum.buyer.email}</p>
                    <label>Buyer Number</label>
                    <p> {datum.buyer.phone_number}</p>
                    
                </div>
            
            <div className="xs-12 sm-3 td">
                <label> Product Short Code </label>
                <p> {datum.product.short_code}</p>
                
                <label> Product Id </label>
                <p> {datum.product.id}</p>
                <label> Product Name </label>
                <p> {datum.product.name}</p>
                <label> Product Price </label>
                <p> {datum.product.price} USD</p>
                
            </div>

            <div className="xs-12 sm-3 td">
                <label> Date Of Transaction  </label>
                <p> {moment(datum.transaction.date).format("DD MMM YYYY hh:mm:ss")}</p>
                
                <label> Amount Received  </label>
                <p> <strong></strong>{datum.transaction.amount_expected_in_dollars} USD | {datum.transaction.amount_received_in_crypto} {datum.transaction.cryptocurrency}</p>

                <a href="https://" target="_blank" rel='noopener noreferrer'> Verify Transaction </a>
            </div>

            <div className="xs-12 sm-3 td">

                <label>  Delivery Resolution  </label>
                <p> Please click the button below to confirm that you have succesfully delivered the product to the customer</p>
                <button className='btn btn-info'>Confirm Delivery</button>

                <label>  Inventory Resolution  </label>
                <p> Please click the button below if you don't not have the product in stock. </p>
                <button className='btn btn-danger'>No Product</button>

            </div>

        </div>
        })}            
        </Tw>)
    }
}

