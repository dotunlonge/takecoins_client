import React from 'react';
import W from "../../styles/home.js";
import { Link } from 'react-router-dom';
import svg from "../../assets/pig.svg";

export default class Home extends React.Component{

    render(){
        return <W className='xs-12'>
        <div className="i-h xs-10 xs-off-1 up">
            <div className="c-w i-h">
                <div className="c i-h t-c">
                
                <div className="xs-12">
                
                 <img src={svg} alt=""/>
               
                    <p className="xs-12 sm-6 sm-off-3"> Collect cryptocurrency payments for the products you sell without worrying about the price fluctuations. </p>
                   
                    <div className="xs-12">
                        <Link to="/login" className="btn btn-success">Login</Link>
                        <Link to="/register" className="btn btn-info">Register</Link>
                    </div>
                
                </div>
                
             
                </div>
            </div>
        </div>
        
        </W>
    }
}