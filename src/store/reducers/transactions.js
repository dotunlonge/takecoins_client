import transactions from "../actions/transactions";

const init = {
    orders: [],
    purchases: [],
    daily_data: {}
};

export default ( state = init, payload) => {
switch ( payload.type ) {
    case transactions.GET_DAILY_INFO_REQUEST:
    return {
        ...state,
        type: transactions.GET_DAILY_INFO_REQUEST
    }

    case transactions.GET_DAILY_INFO_FAILED:
    return {
        ...state,
        type: transactions.GET_DAILY_INFO_FAILED
    }

    case transactions.GET_DAILY_INFO_WENT:
    return {
        ...state,
        type: transactions.GET_DAILY_INFO_WENT,
        daily_data: payload.data
    }
    
    case transactions.GET_ORDERS_WENT:
        return {
            ...state,
            type: transactions.GET_ORDERS_WENT,
            orders: payload.orders
        };

        case transactions.GET_ORDERS_REQUEST:
        return {
            ...state,
            type: transactions.GET_ORDERS_REQUEST
        };

        case transactions.GET_ORDERS_FAILED:
        return {
            ...state,
            type: transactions.GET_ORDERS_FAILED
        };

        case transactions.GET_PURCHASES_WENT:
        return {
            ...state,
            type: transactions.GET_PURCHASES_WENT,
            purchases: payload.purchases
        };

        case transactions.GET_PURCHASES_REQUEST:
        return {
            ...state,
            type: transactions.GET_PURCHASES_REQUEST
        };

        case transactions.GET_PURCHASES_FAILED:
        return {
            ...state,
            type: transactions.GET_PURCHASES_FAILED
        };

    default:
        return state;
}
}