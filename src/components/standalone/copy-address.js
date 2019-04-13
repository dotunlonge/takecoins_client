import React from 'react';
import {connect} from 'react-redux';

class CopyAddress extends React.Component{

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
        return <div className='form-group xs-12 bar t-c'>
            <div className='xs-10 xs-off-1'>
                <label className='t-c'>Please send the <strong>Amount Expected</strong> to this Address</label>
                <div className="well" ref={"textarea"}>{this.props.address}</div>
            </div>
        {
            document.queryCommandSupported('copy') &&
            <div className='xs-4'>
            <button style={{
                    fontSize: '12px',
                    margin: '1em 0'
                }}
             className='btn btn-info' id='copy-link' onClick={this.copyText}> {this.state.copySuccess} </button>
            </div>
        }
    </div>
    }
}

const mapStateToProps = state=>{
    return {
        store_name: state.store.data.slug
    }
}

export default connect(mapStateToProps)(CopyAddress);