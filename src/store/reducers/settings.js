import settingsActions from "../actions/settings";

const initstate = {
    type: "",
    message: "",
    api_credentials: {}
};

export default (state=initstate,payload)=>{
    switch(payload.type){
        
        case settingsActions.CLEAR:
        return {
            ...state,
            type: settingsActions.CLEAR
        }

        case settingsActions.UPDATE_YOUR_SETTINGS_WENT:
        return {
            ...state,
            type: settingsActions.UPDATE_YOUR_SETTINGS_WENT,
            message: payload.message
        }

        case settingsActions.UPDATE_YOUR_SETTINGS_FAILED:
        return {
            ...state,
            type: settingsActions.UPDATE_YOUR_SETTINGS_FAILED,
            message: payload.message
        }

        case settingsActions.GET_API_KEY_REQUEST:
        return {
            ...state,
            type: settingsActions.GET_API_KEY_REQUEST
        }

        case settingsActions.GET_API_KEY_SUCCESSFUL:
        return {
            ...state,
            type: settingsActions.GET_API_KEY_SUCCESSFUL,
            api_credentials: payload.data
        }

        case settingsActions.GET_API_KEY_FAILED:
        return {
            ...state,
            type: settingsActions.GET_API_KEY_FAILED
        }
        
        default:
        return state;
    }
}
