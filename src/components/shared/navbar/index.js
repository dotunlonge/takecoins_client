import React from 'react';
import ResponsiveMenu from "react-responsive-navbar";
import Nav from "../../../styles/navbar";
import { NavLink } from 'react-router-dom';
import { signout } from '../../../store/action-creators/auth';
import {connect} from 'react-redux';
 
export default connect()(class Navbar extends React.Component{
    render(){
        return <Nav>
         <ResponsiveMenu
        menuOpenButton={<button> Open </button> }
        menuCloseButton={<button>Close </button>}
        changeMenuOn="767px"
        largeMenuClassName="large-menu"
        smallMenuClassName="small-menu"
        menu={
          <nav>
            <div className="xs-12 sm-10 sm-off-1">
                <div className="inner">
                    <li><NavLink to="/dashboard">Analytics</NavLink></li>
                    <li><NavLink to="/dashboard/products">Products</NavLink></li>
                    <li><NavLink to="/dashboard/withdrawals">Withdrawals</NavLink></li>
                    <li><NavLink to="/dashboard/settings">Settings</NavLink></li>
                    <li><NavLink to="#" onClick={()=>this.props.dispatch(signout())}>Logout</NavLink></li>
                </div>
            </div>
            
          </nav>
        }
      />
    </Nav>
      
    }
})