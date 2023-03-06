import axios from "axios";
import { loginSuccess, loginFail, userLoadedSuccess, userLoadedFail, authenticatedSuccess, authenticatedFail, logout as myLogout, googleAuthSuccess, googleAuthFail } from "../stores/authSlice";
import { setMessage } from "../stores/messageSlice";
import { setShowSpinner } from "../stores/mainSlice";

export const load_user = async (dis) => {
    const dispatch = dis;

    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch(userLoadedSuccess(res.data));
        }catch(err){
            dispatch(userLoadedFail());
        }
    } else {
        dispatch(userLoadedFail());
    }
};

export const googleAuthenticate = async (state, code, dispatch, navigate) => {
    if(state && code && !localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key)+'='+encodeURIComponent(details[key])).join('&');
        
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            console.log("googleAuthenticate success");
            dispatch(googleAuthSuccess(res.data));
            load_user(dispatch);
            dispatch(setMessage({text: "Registration was successfully!", class: "success", code: res.status}));
            dispatch(setShowSpinner(false));
            navigate('/');
        }catch(err){
            dispatch(googleAuthFail());
            dispatch(setMessage({text: "Something went wrong!", class: "danger", code: err.response.status}));
            dispatch(setShowSpinner(false));
            navigate('/');
        }
    }
}

export const checkAuthenticated = async (dis) => {
    const dispatch = dis;

    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if(res.data.code !== 'token_not_valid' && res.data){
                dispatch(authenticatedSuccess());
            } else {
                dispatch(authenticatedFail());
            }
        } catch(err) {
            dispatch(authenticatedFail());
        }
    } else {
        dispatch(authenticatedFail());
    }
}

export const login = async (email, password, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch(loginSuccess(res.data));
        
        load_user(dispatch);
        dispatch(setMessage({text: "You are logged in successfully!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
    }catch(err){
        dispatch(loginFail());
        const data = err.response.data;
        console.log(data[Object.keys(data)[0]]);
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const signup = async (email, password, re_password, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password, re_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        
        dispatch(setMessage({text: "Registration was successfully! We send activation link to your email address!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
        setTimeout(() => {
            window.location.href = "/signin";
        }, 5000);
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const verify = async (uid, token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token});

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        // Success
    }catch(err){
        // Fail
    }
};

export const reset_password = async (email) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        // Success
    } catch {
        // Fail
    }
}

export const reset_password_confirm = async (uid, token, new_password, re_new_password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        // Success
    } catch {
        // Fail
    }
}

export const logout = (dis) => {
    const dispatch = dis;

    dispatch(myLogout());
}