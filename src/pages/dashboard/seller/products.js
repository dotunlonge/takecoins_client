import React from 'react';
import Table from "../../../components/shared/table/product";

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { find_sellers_products } from '../../../store/action-creators/product';

const ProductW = styled.div`
    padding: 1em 0;

    h3{
        color: white;
    }
    .on-top{
        padding-bottom: 1.5em;
        a{
            padding: .5em 1em;
            cursor: pointer;
            border: 0;
            font-size: 14px;
            text-decoration: none;
        }
    }
`;

class DashProducts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: this.props.list
        }

        props.dispatch(find_sellers_products())
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                list: nextProps.list
            })
        }
    }

    render(){
        const {list} = this.state;
   
        return  <ProductW className="xs-12 ">
            
            <div className='xs-12 pad'>
    
                <div className='on-top xs-10 xs-off-1'>  
                    <h3 className='f-l'>Your Products</h3>
                    <Link to="/dashboard/products/new" className='btn btn-info f-r'>Add New Product</Link>
                </div>
                
                <div className='xs-10 xs-off-1'>
                    <Table data={list}/>
                </div>
            
            </div>
            </ProductW>
       
    }
}


const mapStateToProps = state =>{
    return {
        list: state.product.list
    }
}

export default connect(mapStateToProps)(DashProducts);