import React from 'react';
import moment from "moment";
import Tw from "./style";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import { DateRangePicker } from "react-dates";

export default class Table extends React.Component{
    
    state = {
        inDate: null,
        outDate: null,
        defaultOutDate: null,
        focusedInput: "startDate"
    }

    handleDateUpdate = obj => {
        const { startDate, endDate } = obj;
    
         this.setState({
              inDate: startDate,
              outDate: endDate
         })
      };

      
    render(){
        // const {
            // inDate,
            // outDate,
            // focusedInput
        //   } = this.state;
      
        return (
        <Tw className="xs-12">
            {/* <div className="f-r">
                <div className="form-group filter">
                    <label>Filter: </label>
                    
                    <DateRangePicker
                      startDate={inDate} 
                      startDateId="inDate" 
                      endDate={outDate}
                      endDateId="outDate"
                      numberOfMonths={1}
                      focusedInput={focusedInput}
                      onFocusChange={focusedInput =>
                        this.setState({ focusedInput })
                      }
                      keepOpenOnDateSelect={false}
                      anchorDirection="right"
                      onDatesChange={this.handleDateUpdate}
                    />
                    
                </div>
            </div> */}
        <div className="xs-12">
            {/* <h4 id="details">Details</h4> */}
            <div className="xs-12 sm-4 th">
                <h5>Buyer</h5>
            </div>
            <div className="xs-12 sm-4 th">
                <h5> Product </h5>
            </div>
            <div className="xs-12 sm-4 th">
                <h5> Transaction </h5>
            </div>   
            
        </div>

        {this.props.data.map((datum,index)=>{
            return <div className='xs-12 rowed' key={index}>
            <div className="xs-12 sm-4 td">
                    <label>Buyer Name</label>
                    <p>{datum.buyer.name}</p>
                    <label>Buyer Address</label>
                    <p> {datum.buyer.address}</p>

                    <label>Buyer Email</label>
                    <p>{datum.buyer.email}</p>
                    <label>Buyer Number</label>
                    <p> {datum.buyer.phone_number}</p>
                    
                </div>
            
            <div className="xs-12 sm-4 td">
                <label> Product Short Code </label>
                <p> {datum.product.short_code}</p>
                <label> Product Name </label>
                <p> {datum.product.name}</p>
                <label> Product Price </label>
                <p> {datum.product.price} {datum.product.currency}</p>
                
            </div>

            <div className="xs-12 sm-4 td">

                <label>Quantity Requested</label>
                <p>{datum.transaction.quantity_requested}</p>

                <label> Date Of Transaction  </label>
                <p> {moment(datum.transaction.date).format("DD MMM YYYY hh:mm:ss")}</p>
                
                <label> Amount Received  </label>
                <p> <strong></strong>{datum.transaction.amount_received_in_fiat}  {datum.product.currency} | {datum.transaction.amount_received_in_crypto} {datum.transaction.crypto_currency}</p>

                <a href="https://" target="_blank" rel='noopener noreferrer'> Verify Transaction </a>

                <div className='xs-12'>
                <label>Have you delivered  ?</label>
                <button className='btn btn-info'> Yes</button>
                </div>
            </div>

        </div>
        })}            
        </Tw>)
    }
}

