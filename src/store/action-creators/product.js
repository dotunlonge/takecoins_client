import ax from "axios";
import productActions from "../actions/product";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";

export const get_one = (id)=>{
    return  dispatch=>{
         dispatch({ type: productActions.FIND_SELLER_ONE_PRODUCT_REQUEST})
         ax({
             method: "GET",
             url: e.product.multi + "/" + id,
             headers:{
                 authorization: retrieveToken()
             }
         }).then(res=>{
             dispatch({ type: productActions.FIND_SELLER_ONE_PRODUCT_WENT, one: res.data })
         }).catch(resp=>{
             dispatch({ type: productActions.FIND_SELLER_ONE_PRODUCT_FAILED, message:extractMessage(resp)})
        
         })
     }
 }

export const add = (obj)=>{
   return  dispatch=>{
        dispatch({ type: productActions.ADD_PRODUCT_REQUEST})
        ax({
            method: "POST",
            url: e.product.multi,
            data: obj,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: productActions.ADD_PRODUCT_WENT, message: res.data.message })
        }).catch(resp=>{
            dispatch({ type: productActions.ADD_PRODUCT_FAILED, message:extractMessage(resp)})
       
        })
    }
}

export const update = (obj,id)=>{
    return dispatch=>{
        dispatch({ type: productActions.UPDATE_PRODUCT_REQUEST})
        ax({
            method: "PUT",
            url: e.product.multi +"/" + id,
            data: obj,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: productActions.UPDATE_PRODUCT_WENT, message: res.data.message })
        }).catch(resp=>{
            dispatch({ type: productActions.UPDATE_PRODUCT_FAILED, message: extractMessage(resp) })
       
        })
    }
}

export const search = short_code =>{
    return dispatch => {
        dispatch({ type: productActions.SEARCH_PRODUCT_REQUEST})
        ax({
            method: "POST",
            url: e.product.search,
            data:{
                short_code
            },
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{

            dispatch({ type: productActions.SEARCH_PRODUCT_WENT, product_id: res.data.product_id })
        
        }).catch(resp=>{
        
            dispatch({ type: productActions.SEARCH_PRODUCT_FAILED, message: extractMessage(resp) })
       
        })
    }
}

export const delete_product = (id)=>{
    return dispatch=>{
        dispatch({ type: productActions.DELETE_PRODUCT_REQUEST})
        ax({
            method: "DELETE",
            url: e.product.multi +"/" + id,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: productActions.DELETE_PRODUCT_WENT, id, message: res.data.message })
        }).catch(resp=>{
            dispatch({ type: productActions.DELETE_PRODUCT_FAILED, message: extractMessage(resp) })
       
        })
    }
}

export const find_sellers_products = ()=>{
    return dispatch=>{
        dispatch({ type: productActions.FIND_SELLER_PRODUCTS_REQUEST})
        ax({
            method: "GET",
            url: e.product.multi,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: productActions.FIND_SELLER_PRODUCTS_WENT, list: res.data })
        }).catch(resp=>{
            dispatch({ type: productActions.FIND_SELLER_PRODUCTS_FAILED, message: extractMessage(resp) })
       
        })
    }
}
