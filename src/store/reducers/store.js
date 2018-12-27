import store from "../actions/store";

const initstate = {
type: "",
message: "",
data: {},
processed_purchase_info: {},
products: []
};

export default (state=initstate,payload)=>{
    switch(payload.type){

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
        

        default:
        return state;
    }
}
