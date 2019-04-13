import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const CopyWrap = styled.div`
    
    .has-link{
        background: white;
        margin: 15px 0;
        padding: 10px;

        p{
            padding: 15px 0 0;
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

class CopyLink extends React.Component{

    constructor(props){
        super(props)
        this.state={
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
        return  <CopyWrap className='xs-12'>

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
        </CopyWrap>
    }
}


const mapStateToProps = state=>{
    return {
        store_name: state.auth.credentials.store.slug
    }
}
export default connect(mapStateToProps)(CopyLink);