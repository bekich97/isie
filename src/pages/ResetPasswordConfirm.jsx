import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { setMessage } from '../stores/messageSlice';
import MyAlert from '../components/MyAlert';

const ResetPasswordConfirm = () => {
    const [formData, setFormData] = useState({
        otp: "",
        password: "",
        re_password: ""
    });
    const dispatch = useDispatch();
    const {otp, password, re_password} = formData;
    const message = useSelector(state => state.messageSlice.message);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const phone = localStorage.getItem("reset_password_phone");

        if (otp && otp.length === 6 && password && re_password && password === re_password) {
            reset_password_confirm(phone, otp, password, re_password, dispatch);
        } else {
            dispatch(setMessage({text: "OTP code, password and Confirmation password are required! And they are must match!", class: "danger", code: 400}));
        }
    };

    return (
        <div className='container mt-5 auth-page'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 m-auto'>
                    <h1>Reset your Password</h1>
                    {
                        message ?
                        <MyAlert status_class={message.class} text={message.text} />
                        :
                        ""
                    }
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="text" 
                                placeholder='OTP code'
                                name='otp'
                                value={otp}
                                onChange={e=>onChange(e)}
                                minLength={6}
                                maxLength={6}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="password" 
                                placeholder='New Password'
                                name='password'
                                value={password}
                                onChange={e=>onChange(e)}
                                minLength={6}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="password" 
                                placeholder='New Password Confirm'
                                name='re_password'
                                value={re_password}
                                onChange={e=>onChange(e)}
                                minLength={6}
                                required
                            />
                        </div>
                        <button className='btn btn-primary' type='submit'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordConfirm;
