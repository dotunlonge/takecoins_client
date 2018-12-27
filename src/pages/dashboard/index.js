import React from 'react';
import Seller from './seller';
import {connect} from "react-redux";


const mapStateToProps = state =>{
    return {
        role : state.auth.credentials.role
    }
}

export default connect(mapStateToProps)((props)=>{
    const {role} = props;
    
    if(role === "Seller"){
        return <Seller {...props}/>
    }else{
        return <div>Buyer Dashboard</div>
    }
})

