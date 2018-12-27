import settings from "../actions/settings";
import axios from "axios";
import { extractMessage } from "../../helpers/utils";
import endpoints from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";

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