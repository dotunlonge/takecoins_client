import productActions from "../actions/product";

const initstate = {
type: "",
message: "",
list: [],
one: {}
};

export default (state=initstate,payload)=>{
    switch (payload.type) {

        case productActions.FIND_SELLER_ONE_PRODUCT_REQUEST:
        return {
            ...state,
            type: productActions.FIND_SELLER_ONE_PRODUCT_REQUEST
        };
    
        case productActions.FIND_SELLER_ONE_PRODUCT_WENT:
        return {
            ...state,
            type: productActions.FIND_SELLER_ONE_PRODUCT_WENT,
            one: payload.one
        };

        case productActions.FIND_SELLER_ONE_PRODUCT_FAILED:
        return {
            ...state,
            type: productActions.FIND_SELLER_ONE_PRODUCT_FAILED,
            message: payload.message
        };




        case productActions.FIND_SELLER_PRODUCTS_REQUEST:
        return {
            ...state,
            type: productActions.FIND_SELLER_PRODUCTS_REQUEST
        };
    
        case productActions.FIND_SELLER_PRODUCTS_WENT:
        return {
            ...state,
            type: productActions.FIND_SELLER_PRODUCTS_WENT,
            list: payload.list
        };

        case productActions.FIND_SELLER_PRODUCTS_FAILED:
        return {
            ...state,
            type: productActions.FIND_SELLER_PRODUCTS_FAILED,
            message: payload.message
        };


        case productActions.ADD_PRODUCT_REQUEST:
        return {
            ...state,
            type: productActions.ADD_PRODUCT_REQUEST
        };
    
        case productActions.ADD_PRODUCT_WENT:
        return {
            ...state,
            type: productActions.ADD_PRODUCT_WENT,
            message: payload.message
        };

        case productActions.ADD_PRODUCT_FAILED:
        return {
            ...state,
            type: productActions.ADD_PRODUCT_FAILED,
            message: payload.message
        };



        case productActions.DELETE_PRODUCT_REQUEST:
        return {
            ...state,
            type: productActions.DELETE_PRODUCT_REQUEST
        };
    
        case productActions.DELETE_PRODUCT_WENT:
        return {
            ...state,
            type: productActions.DELETE_PRODUCT_WENT,
            message: payload.message,
            list: state.list.map(p=>{
                if(p.product_id === payload.id){
                     p.deleted =true
                }

                return p
            })
        };

        case productActions.DELETE_PRODUCT_FAILED:
        return {
            ...state,
            type: productActions.DELETE_PRODUCT_FAILED,
            message: payload.message
        };


        case productActions.UPDATE_PRODUCT_REQUEST:
        return {
            ...state,
            type: productActions.UPDATE_PRODUCT_REQUEST
        };
    
        case productActions.UPDATE_PRODUCT_WENT:
        return {
            ...state,
            type: productActions.UPDATE_PRODUCT_WENT,
            message: payload.message
        };

        case productActions.UPDATE_PRODUCT_FAILED:
        return {
            ...state,
            type: productActions.UPDATE_PRODUCT_FAILED,
            message: payload.message
        };

        default:
            return state;
    }
}