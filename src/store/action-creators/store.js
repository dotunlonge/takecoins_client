import ax from "axios";
import storeActions from "../actions/store";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";
import auth from "../actions/auth";

let start_listening_call;
let continue_listening_call;

export const update_step = step => {
    return {
        type: storeActions.UPDATE_STEP,
        step
    }
}  

export const store_what_to_send = obj => {
    return {
        type: storeActions.STORE_WHAT_TO_SEND,
        obj_to_send: obj
    }
}

export const continue_listening_for_transaction = obj =>{
    return dispatch=>{

        if (continue_listening_call) {
            continue_listening_call.cancel();
        }

        continue_listening_call = ax.CancelToken.source();

        dispatch({ type: storeActions.FIND_FULL_TX_REQUEST })
        ax({

            method: "POST",
            url: e.store.continue_listen,
            data: obj,
            cancelToken: continue_listening_call.token,
          
            headers:{
                authorization: retrieveToken()
            }

        }).then(res=>{
            dispatch({ 
                type: storeActions.FIND_FULL_TX_SUCCESSFUL,
                data: res.data
               })
        }).catch(resp=>{
            dispatch({ 
                type: storeActions.FIND_FULL_TX_FAILED,
               message: extractMessage(resp)
           })
        })
    }    
} 

export const start_listening_for_transaction =  obj => {
    return dispatch=>{

        if (start_listening_call) {
            start_listening_call.cancel();
        }

        start_listening_call = ax.CancelToken.source();

        dispatch({ type: storeActions.FIND_TX_HASH_REQUEST })
        ax({
            method: "POST",
            url: e.store.listen,
            data: obj,
            cancelToken: start_listening_call.token,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ 
                type: storeActions.FIND_TX_HASH_SUCCESSFUL,
                data: res.data
                })
        }).catch(resp=>{
            if ( ax.isCancel(resp) ){ 
                console.log('request canceled', resp.message);
            }else{
                dispatch({ 
                    type: storeActions.FIND_TX_HASH_FAILED,
                    message: extractMessage(resp)
                })
            }
        })
    }
}

export const process_purchase_information = (obj) => {
    return dispatch=>{
        dispatch({ type: storeActions.PROCESS_PURCHASE_INFO_REQUEST })
        ax({
            method: "POST",
            url: e.store.process,
            data: obj,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ 
                type: storeActions.PROCESS_PURCHASE_INFO_WENT,
                processed_purchase_info: res.data
               })
        }).catch(resp=>{
            dispatch({ 
                type: storeActions.PROCESS_PURCHASE_INFO_FAILED,
               message: extractMessage(resp)
           })

           if(extractMessage(resp) === "User Does Not Exist"){
                dispatch({
                    type: auth.SIGNOUT
                })
           }
        })
    }
}

export const fetch_store_information = (store_name) => {
    return  dispatch=>{
         dispatch({ type: storeActions.FIND_STORE_INFORMATION_REQUEST })
         ax({
             method: "POST",
             url: e.store.get,
             data: {
                store_name
             }
         }).then(res=>{
             dispatch({ 
                 type: storeActions.FIND_STORE_INFORMATION_WENT,
                  store: res.data
                })
         }).catch(resp=>{
             dispatch({ 
                 type: storeActions.FIND_STORE_INFORMATION_FAILED,
                message: extractMessage(resp)
            })
        
         })
     }
}
