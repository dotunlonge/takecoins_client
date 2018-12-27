import React from 'react';
import SW from "../../styles/others";
import { Link, withRouter } from 'react-router-dom';

class p404 extends React.Component{
    render(){
        return <SW className='xs-12' id="p404">
            <div className='xs-10 xs-off-1 pad i-h'>
            <div className="c-w i-h">
                <div className="c i-h t-c">
                    <h1> Page Not Found </h1>
                    <Link to="/" onClick={ this.props.history.goBack }>Go Back</Link>
                </div>
            </div>
            </div>
        </SW>
    }
}
export default withRouter( p404 );