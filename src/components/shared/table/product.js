import React from 'react';
import Tw,{DW} from "./style";
import { Link, withRouter } from 'react-router-dom';
import { notify } from '../../../store/action-creators/app';
import { delete_product } from '../../../store/action-creators/product';
import product from '../../../store/actions/product';
import {connect} from 'react-redux';
import moment from 'moment';

 class Product extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data: [],
            isFirstFetch: true,
            fetching: false,
            present_filter: ""
        }
    }

    filter = (value)=>{
    
        switch (value) {
        
        case "deleted":
        return this.setState({
            present_filter: "deleted",
            data: this.props.data.filter(p=>{
                return p.deleted === true
            })
        })
        
        case "not-deleted":
        return this.setState({
            present_filter: "not-deleted",
            data: this.props.data.filter(p=>{
                return p.deleted === false
            })
        })
        
    
        default:
            return this.setState({
                present_filter: "",
                data: this.props.data
            })
    }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

            if(this.state.isFirstFetch ===false && nextProps.type === product.FIND_SELLER_PRODUCTS_WENT){
                this.setState({
                    isFirstFetch: true,
                    data: nextProps.data.filter(p=>{
                        return p.deleted === false
                    })
                })
            }

            if(this.state.isFirstFetch === true && nextProps.type === product.FIND_SELLER_PRODUCTS_WENT){
                this.setState({
                    data: nextProps.data.filter(p=>{
                        return p.deleted === false
                    })
                })
            }
            
            this.setState({
                fetching: nextProps.type === product.FIND_SELLER_PRODUCTS_REQUEST
            })
            
            if( nextProps.type === product.DELETE_PRODUCT_FAILED ){
                notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
            }
            if( nextProps.type === product.DELETE_PRODUCT_WENT ){
                notify(<p style={{color: 'white'}}> {nextProps.message}</p>,"success");
                this.setState({
                    data: nextProps.data.filter(p=>{
                        return this.state.present_filter !== "not-deleted" ? p: p.deleted === false
                    })
                })
            }
        }
    }

    render(){

        return <Tw className="xs-12">
          <div className="f-r">
                <div className="form-group">
                    <label>Filter: </label>
                    <select name="showOnly" id="showOnly" onChange={e=>this.filter(e.target.value)}>
                        <option value="not-deleted"> Show Not Deleted </option>
                        <option value="all"> Show Everything </option>
                        <option value="deleted"> Show Only Deleted </option>
                    </select>
                </div>
            </div>
        <div className="xs-12">
            <h4 id="details">Details</h4>
            <div className="xs-12 sm-6 th">
                <h5>Product</h5>
            </div>
            <div className="xs-12 sm-6 th">
                <h5>Sales</h5>
            </div>
{/*             
            <div className="xs-12 sm-3 th">
                <h5> Pictures </h5>
            </div>    */}
        </div>

        {
            this.state.isFirstFetch && this.state.fetching &&
                <div className='xs-12 rowed fetching'>
                    <p>Fetching Products...</p>
                </div>
        }

        {    this.state.data.length === 0 && this.state.fetching === false?
                <div className='xs-12 rowed fetching'>
                    <p>No Products Found</p>
                </div>
            :
            this.state.data.map((datum,index)=>{
            return <div className='xs-12 rowed' key={index}>
                <div className="xs-12 sm-6 td">
                <label>Deleted</label>
                { datum.deleted ? <p style={{color: "red"}}>YES</p>:<p style={{color: "blue"}}>NO</p> }
                    
                    
                    <label>Product Name</label>
                    <p>{ datum.name }</p>

                    <label>Product Description</label>
                    <p> { datum.description }</p>
            

                    <label>Product Short Code </label>
                    <p>{ datum.short_code }</p>

                    <label>Product Long ID</label>
                    <p> { datum.product_id }</p>
            
                    
                    <label> Product Price </label>
                    <p> { datum.price } {datum.currency}</p>

                    <label>Date Added</label>
                    <p> { moment(datum.createdAt).format("YYYY-MM-DD hh:mm:ss") } </p>
                    
                    <label> Actions </label>
                    <div className="xs-12 options">
                        <Link to={`/dashboard/products/edit/${datum.product_id}`} className='btn btn-success'>Edit</Link>
                        {/* <button className='btn btn-success '>Edit</button> */}
                        <button className='btn btn-danger' onClick={()=>{
                            notify(<DW>
                                <h3>Are Your Sure You Want To Delete This Project ?</h3>
                                <p> {datum.name}</p>
                                <button onClick={()=> this.props.dispatch(delete_product(datum.product_id))}>Yes</button>
                                <button>No</button>
                            </DW>, "error")
                        }}>Delete</button>
                    </div>
                </div>

                <div className='xs-12 sm-6 td'>
                    
                    <label>Quantiy Available</label>
                    <p>{datum.quantity.available}</p>
                    
                    <label>Quantiy Sold</label>
                    <p>{datum.quantity.sold_count}</p>

                    <label>Sales Total</label>
                    <p>{datum.quantity.sold_money} {datum.currency}</p>
                    
                </div>


                {/* <div className='xs-12 sm-3 td'>
                    {datum.images.map((p,i)=>{
                        return <img src={p} className="xs-4 sm-5" height="100px" 
                        style={{objectFit: "cover", margin:"1em .5em"}} alt="" key={i}/>
                    })}
                </div>
                 */}
                </div>
        })}            
     
        </Tw>
    }
}

const mapStateToProps = state =>{
    return {
        type: state.product.type,
        message: state.product.message
    }
}

export default withRouter( connect(mapStateToProps)(Product));