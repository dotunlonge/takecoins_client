import axios from 'axios';
import endpoints from '../../endpoints';
import { retrieveToken } from '../../helpers/TokenManager';
import transactions from '../actions/transactions';
import { extractMessage } from '../../helpers/utils';

// for sellers
export const get_orders = ()=>{
    return dispatch => {
        dispatch({ type: transactions.GET_ORDERS_REQUEST })
        axios({
            url: endpoints.transactions.get_buying_orders,
            method:"GET",
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: transactions.GET_ORDERS_WENT, orders: res.data })
        }).catch(res=>{
            dispatch({ type: transactions.GET_ORDERS_FAILED, message: extractMessage(res) })
        })
    }
}

export const get_daily_financial_info = () => {
    return dispatch => {
        dispatch({ type: transactions.GET_DAILY_INFO_REQUEST })
        axios({
            url: endpoints.transactions.daily,
            method: "GET",
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: transactions.GET_DAILY_INFO_WENT, message: extractMessage(res), data: res.data })
        }).catch(res=>{
            dispatch({ type: transactions.GET_DAILY_INFO_FAILED, message: extractMessage(res) })
        })
    }
}

// for buyers
export const get_purchases = ()=>{
    return dispatch => {
        dispatch({ type: transactions.GET_PURCHASES_REQUEST })
        axios({
            url: endpoints.transactions.get_purchase_orders,
            method:"GET",
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: transactions.GET_PURCHASES_WENT, orders: res.data })
        }).catch(res=>{
            dispatch({ type: transactions.GET_PURCHASES_FAILED, message: extractMessage(res) })
        })
    }
}
