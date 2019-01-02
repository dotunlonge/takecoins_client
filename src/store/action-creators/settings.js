import settings from "../actions/settings";
import axios from "axios";
import { extractMessage } from "../../helpers/utils";
import endpoints from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";

export const get_api_key = ()=>{
    return dispatch=>{
        axios({
            url:endpoints.get_api_cred,
            method: "GET",
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({
                type: settings.GET_API_KEY_SUCCESSFUL, data: res.data
            })
        }).catch(res=>{
            dispatch({
                type: settings.GET_API_KEY_SUCCESSFUL, settings: extractMessage(res)
            })   
        })
    }
}

export const get_your_settings = () => {
    return dispatch => {
        axios({
            url:endpoints.settings,
            method: "GET",
            headers: {
                authorization: retrieveToken()
            }
            }).then(res=>{
                dispatch({
                    type: settings.GET_YOUR_SETTINGS_WENT, data: res.data
                })
            }).catch(res=>{
                dispatch({
                    type: settings.GET_YOUR_SETTINGS_FAILED, message: extractMessage(res)
                })   
            })
        }   
    }

export const update_settings = obj => {
    return dispatch => {
        axios({
            url:endpoints.settings,
            method: "POST",
            data: obj,
            headers: {
                authorization: retrieveToken()
            }
            }).then(res=>{
                if(res.data.token){
                    setToken("ss", res.data.token)
                }
                dispatch({
                    type: settings.UPDATE_YOUR_SETTINGS_WENT, data: res.data, message: res.data.message
                })
            }).catch(res=>{
                dispatch({
                    type: settings.UPDATE_YOUR_SETTINGS_FAILED, message: extractMessage(res)
                })   
            })
        }   
    }