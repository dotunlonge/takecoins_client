import store from "../actions/store";
import { retrieveToken } from "../../helpers/TokenManager";

const initstate = {
    type: "",
    message: "",
    data: {},
    processed_purchase_info: {},
    products: [],
    found_transaction:false,
    transaction_details: {},
    obj_to_send: {},
    is_token_present: Boolean(retrieveToken()),
    step: 0
};

export default (state=initstate,payload)=>{
    switch(payload.type){

        case store.ANY_REQUEST_CANCELLATION:
        return {
            ...state,
            type: store.ANY_REQUEST_CANCELLATION
        }

        case store.FIND_TX_HASH_REQUEST:
        return {
            ...state,
            type: store.FIND_TX_HASH_REQUEST
        }
        
        case store.FIND_TX_HASH_SUCCESSFUL:
        return {
            ...state,
            type: store.FIND_TX_HASH_SUCCESSFUL,
            found_transaction: payload.data.found_transaction
        }
        
        case store.FIND_TX_HASH_FAILED:
        return {
            ...state,
            type: store.FIND_TX_HASH_FAILED
        }



        
        case store.FIND_FULL_TX_REQUEST:
        return {
            ...state,
            type: store.FIND_FULL_TX_REQUEST
        }
        
        case store.FIND_FULL_TX_SUCCESSFUL:
        return {
            ...state,
            type: store.FIND_FULL_TX_SUCCESSFUL,
            transaction_details: payload.data
        }
        
        case store.FIND_FULL_TX_FAILED:
        return {
            ...state,
            type: store.FIND_FULL_TX_FAILED
        }
        



        case store.FIND_STORE_INFORMATION_REQUEST:
        return {
            ...state,
            type: store.FIND_STORE_INFORMATION_REQUEST
        }

        case store.FIND_STORE_INFORMATION_WENT:
        return {
            ...state,
            type: store.FIND_STORE_INFORMATION_WENT,
            data: payload.store.data,
            products: payload.store.products
        }

        case store.FIND_STORE_INFORMATION_FAILED:
        return {
            ...state,
            type: store.FIND_STORE_INFORMATION_FAILED,
            message: payload.message
      
        }
        

        case store.PROCESS_PURCHASE_INFO_REQUEST:
        return {
            ...state,
            type: store.PROCESS_PURCHASE_INFO_REQUEST
        }
        case store.PROCESS_PURCHASE_INFO_WENT:
        return {
            ...state,
            type: store.PROCESS_PURCHASE_INFO_WENT,
            processed_purchase_info: payload.processed_purchase_info
        }
        case store.PROCESS_PURCHASE_INFO_FAILED:
        return {
            ...state,
            type: store.PROCESS_PURCHASE_INFO_FAILED,
            message: payload.message
        }

        case store.STORE_WHAT_TO_SEND:
        return {
            ...state,
            type: store.STORE_WHAT_TO_SEND,
            obj_to_send: payload.obj_to_send,
            step: Boolean(retrieveToken()) ? 2:1
        }

        case store.UPDATE_STEP:
        return {
            ...state,
            step: payload.step
        }
        
        default:
        return state;
    }
}
