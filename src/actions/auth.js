import axios from "axios";
import { userLoadedSuccess, userLoadedFail } from "../stores/authSlice";
import { setShowSpinner } from "../stores/mainSlice";
import { setMessage } from "../stores/messageSlice";


export const load_user = async (dispatch) => {

    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/accounts/me/`, config);
    
            dispatch(userLoadedSuccess(res.data));
        }catch(err){
            dispatch(userLoadedFail());
        }
    } else {
        dispatch(userLoadedFail());
    }
};

export const signup = async (phone, nickname, name, password, re_password, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({phone, nickname, name, password, re_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/accounts/signup/`, body, config);
        
        dispatch(setMessage({text: "Registration was successfully! We send OTP code to your phone number!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
        localStorage.setItem('otp-phone', phone);
        setTimeout(() => {
            window.location.href = "/otp-check";
        }, 3000);
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const otp_check = async (phone, otp, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({phone, otp});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/accounts/otp-check/`, body, config);
        
        dispatch(setMessage({text: "OTP checked successfully! Then you can log in!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
        localStorage.removeItem('otp-phone');
        setTimeout(() => {
            window.location.href = "/signin";
        }, 3000);
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const signin = async (phone, password, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({phone, password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/accounts/signin/`, body, config);

        localStorage.setItem('access', res.data.access);

        load_user(dispatch);
        dispatch(setMessage({text: "You are logged in successfully!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const reset_password_request = async (phone, dispatch, navigate) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({phone});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/accounts/reset-password-request/`, body, config);

        localStorage.setItem('reset_password_phone', phone);

        dispatch(setMessage({text: "We sent OTP code to your phone number!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
        navigate("/reset-password-confirm");
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};

export const reset_password_confirm = async (phone, otp, password, re_password, dispatch) => {
    dispatch(setShowSpinner(true));

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({phone, otp, password, re_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/accounts/reset-password/`, body, config);

        localStorage.removeItem('reset_password_phone');

        dispatch(setMessage({text: "Password changed successfully!", class: "success", code: res.status}));
        dispatch(setShowSpinner(false));
    }catch(err){
        const data = err.response.data;
        const msg_key = Object.keys(data)[0];
        const msg_value = typeof data[Object.keys(data)[0]] === "string" ? data[Object.keys(data)[0]] : data[Object.keys(data)[0]][0];
        dispatch(setMessage({text: msg_key + " : " + msg_value, class: "danger", code: err.response.status}));
        dispatch(setShowSpinner(false));
    }
};