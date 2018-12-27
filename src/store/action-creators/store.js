import ax from "axios";
import storeActions from "../actions/store";
import e from "../../endpoints";
 import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";
import auth from "../actions/auth";


export const process_purchase_information = (obj)=>{
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

export const fetch_store_information = (store_name)=>{
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
