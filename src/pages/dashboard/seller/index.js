import React from 'react';
import styled from 'styled-components';
import Table from "../../../components/shared/table/homepage";
import {connect} from 'react-redux';

const HomeW = styled.div`

    background: #ececec;
    padding: 1em;
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

        h2{

        }

    }
   

    .well.well-sm{

        padding: .8em 25px;
        background: silver;
        margin: 0 0 15px;
        width: auto;
        display: inline-block;
        border-radius: 5px;

        a{
            color: snow;
            cursor: unset;
        }


        #copy-link{
            margin-left: 20px;
            background: #2196F3;
            font-size: 14px;
            color: white;
            border-color: transparent;
            font-weight: 300;
            border-radius: 5px;
            cursor: pointer;
        }
        
    }

    p{
        font-size: 14px;
        font-weight: 300;
    }

`;
class SellerDashHome extends React.Component{
    render(){
        const data = [
            {
                buyer:{
                    name: 'Tanner Linsley',
                    address: "15a idejo street, idowu martins, aloko-ebi, off badejo road, ilupeju ibaro, lekki phase 1, ikorodu, Lagos State, Nigeria."
                },
                product: {
                    id: "110339455901019129120213912931201329",
                    name: "Hair Removal Cream",
                    price: 51
                },
                transaction: {
                    date: new Date(),
                    amount_expected_in_dollars: 430,
                    amount_received_in_crypto: 8.401,
                    cryptocurrency: "Ether" 
                },
                resolutions:{
                    hasSellerResolved: false,
                    sellerSaid: ""
                }
            }]
        
         
        return <div className='xs-12'> 
          <div className='xs-12'>
    
            <HomeW className='xs-12'>

            <div className="xs-12 t-c">
            <p> Share This Link With Your Customers To Collect Crypto Payments  </p>
            <div className="well well-sm"> 
                <a href={`${window.location.origin}/${this.props.store_name}`} target="_blank" rel="noopener noreferrer">
                {`${window.location.origin}/${this.props.store_name}`}

                </a>

                <button id='copy-link'> Copy Link </button>
            </div>
            </div>
            
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4>Received Today</h4>
                        <h2>-</h2>
                    </div>
                </div>
                
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                        <h4>Received Total</h4>
                        <h2>-</h2>
                  
                    </div>
                </div>
                
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                    <h4>Transactions Today</h4>
                        <h2>-</h2>
                    </div>
                </div>
                
                <div className="xs-12 sm-3">
                    <div className="xs-12 sm-11 card white bordered">
                    <h4>Transactions Total</h4>
                        <h2>-</h2>
                    </div>
                </div>
                
            </HomeW>

            <div className='xs-12'>
                <Table data={data}/>
            </div>
          </div>
        </div>
    }
}

const mapStateToProps = state=>{
    return {
        store_name: state.auth.credentials.store.slug
    }
}
export default connect(mapStateToProps)(SellerDashHome);