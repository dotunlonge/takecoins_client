import React from 'react';
import styled from 'styled-components';
import Table from "../../../components/shared/table/homepage";
import {connect} from 'react-redux';
import CopyLink from '../../../components/shared/copy-link';
import { get_orders, get_daily_financial_info } from '../../../store/action-creators/transactions';

const HomeW = styled.div`
padding: 1em 0em 1em 0em;
margin: auto;

.white{
    background:white;
}

.bordered{
    border-radius: 0px;
}

.card{
    min-height: 75px;
    padding: 1em;

    h4{
        font-weight: 300;
        font-size: 14px;
    }

}

`;

class SellerDashHome extends React.Component{
    constructor(props) {
        super(props);
        
        props.get_orders();
        props.get_daily_info();

            this.state = { 
                orders: this.props.orders
            }
      }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                orders: nextProps.orders
            })
        }
    }
  
    render(){

        const data = this.state.orders;
    
        return <div className='xs-12 sm-10 sm-off-1'> 

            <CopyLink/>

            <HomeW className='xs-12 body'>
            <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4> Ethereum Received Today</h4>
                        <h2>{this.props.daily_data.total_ethereum_today}</h2>
                    </div>
                </div>

                <div className="xs-12 sm-3">
                    <div className="xs-11  card white bordered">
                    <h4> Received In Fiat Today </h4>
                    <h2>{this.props.daily_data.total_fiat}</h2><span>NGN</span>
                 
                    </div>
                </div>
                
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4> Bitcoin Received Today</h4>
                        <h2>{this.props.daily_data.total_bitcoin_today}</h2>
                 
                    </div>
                </div>

                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-12 card white bordered">
                    <h4> Transactions Today </h4>
                    <h2>{this.props.daily_data.total_transaction_count}</h2>
                 
                    </div>
                </div>


            </HomeW>
            

            <div className='xs-12'>
                <Table data={data}/>
            </div>
          </div>

    }
}

const mapStateToProps = state=>{
    return {
        store_name: state.auth.credentials.store.slug,
        orders: state.transactions.orders,
        daily_data: state.transactions.daily_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_orders : () => dispatch(get_orders()),
        get_daily_info: ()=> dispatch(get_daily_financial_info())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerDashHome);