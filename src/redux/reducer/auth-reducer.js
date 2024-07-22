import { LOGIN, REGISTER, LOADING, ERROR } from '../actions/action-types';


const initialState = {
    token: null,
    user: null,
    loading: false,
    isError: false,
    isSuccess: false,
    error: null
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                token: action.token,
                user: action.user,
                loading: false,
                isError: false,
                isSuccess: true,
                error: null
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                isError: true,
                loading: false,
                error: "ERROR",
                token: null,
                user: null
            }
        default:
            return state
    }
}


export default authReducer;