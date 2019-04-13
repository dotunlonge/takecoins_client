import React from 'react';
import styled from 'styled-components';
// import Table from "../../../components/shared/table/account";
import {connect} from 'react-redux';
import CopyLink from '../../../components/shared/copy-link';

const AccountW = styled.div`
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



class MyAccount extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
        }
      }
  
    render(){
        
        return <div className='xs-12 sm-10 sm-off-1'> 

            <CopyLink/>

            <AccountW className='xs-12 body'>
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4>Total Ethereum Received</h4>
                        <h2>-</h2>
                    </div>
                </div>

                <div className="xs-12 sm-3">
                    <div className="xs-11  card white bordered">
                    <h4> Total Received In Fiat </h4>
                        <h2>-</h2>
                    </div>
                </div>
                
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4>Total Bitcoin Received</h4>
                        <h2>-</h2>
                    </div>
                </div>

                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-12 card white bordered">
                    <h4>All-Time Transactions </h4>
                        <h2>-</h2>
                    </div>
                </div>

            </AccountW>
            

            <div className='xs-12'>
                {/* <Table data={data}/> */}
            </div>
          </div>
    
    }
}

const mapStateToProps = state=>{
    return {
        // store_name: state.auth.credentials.store.slug
    }
}
export default connect(mapStateToProps)(MyAccount);