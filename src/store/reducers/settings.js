import settingsActions from "../actions/settings";

const initstate = {
type: "",
message: "",
api_credentials:{}
};

export default (state=initstate,payload)=>{
    switch(payload.type){

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
