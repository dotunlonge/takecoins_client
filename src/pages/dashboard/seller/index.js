import React from 'react';
import styled from 'styled-components';
import Table from "../../../components/shared/table/homepage";
import {connect} from 'react-redux';

const HomeW = styled.div`
    
    .has-link{
        background: white;
        margin: 15px 0;
        padding: 10px;

        p{
            padding: 15px 0 0;
        }
    }
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
   

    .wel.well-sm{

        padding: .8em 0;
        background: #545c65;
        display: inline-block;
        border-radius: 5px;
        margin-bottom: 0px;
        
        a{

            color: snow;
            overflow-wrap: break-word;
            font-size: 14px;
            font-weight: 300;
            display: block;
            text-align: left;
            padding-top: 7px;
        
            @margin(min-width: 768px){
                padding-left: 20px;
            }
        }


        #copy-link{
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
    constructor(props) {
        super(props);
        this.state = { 
            copySuccess: 'Copy' 
        }
      }
    copyText = (element) =>{
        element = this.refs.textarea;
        var range, selection;
      
        if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(element);
          range.select();
        } else if (window.getSelection) {
          selection = window.getSelection();        
          range = document.createRange();
          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        
        try {
          document.execCommand('copy');
          this.setState({ copySuccess: 'Copied!' });

          setTimeout(()=>{
            this.setState({ copySuccess: 'Copy' });
          },3000)

        }
        catch (err) {
            this.setState({ copySuccess: 'Unable To Copy!' });
            setTimeout(()=>{
                this.setState({ copySuccess: 'Copy' });
              },3000)
    
        }
      }

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
        
         
        return <div className='xs-12 sm-10 sm-off-1'> 
          <HomeW className='xs-12'>

            <div className="xs-12 t-c has-link">
                <p className='xs-12 sm-6'>  Share This Link With Your Customers To Collect Crypto Payments  </p>
                
                <div className="wel well-sm xs-12 sm-6"> 
                    <div className='xs-10 xs-off-1'>
                        <a href={`${window.location.origin}/${this.props.store_name}`} target="_blank" rel="noopener noreferrer" className='xs-8' ref={"textarea"}>
                        {`${window.location.origin}/${this.props.store_name}`}
                        </a>
                        {
                            document.queryCommandSupported('copy') &&
                            <div className='xs-4'>
                            <button className='btn btn-success' id='copy-link' onClick={this.copyText}> {this.state.copySuccess} </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='xs-12 body'>

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
                    <div className="xs-12  card white bordered">
                    <h4>Transactions Total</h4>
                        <h2>-</h2>
                    </div>
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
        store_name: state.auth.credentials.store.slug
    }
}
export default connect(mapStateToProps)(SellerDashHome);