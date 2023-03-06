import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from '../components/MyAlert';
import { setMessage } from '../stores/messageSlice';
import { otp_check } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const message = useSelector(state => state.messageSlice.message);
    const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    
    const [formData, setFormData] = useState({
        otp: ""
    });

    const {otp} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const phone = localStorage.getItem('otp-phone');

        if (otp.length === 6) {
            otp_check(phone, otp, dispatch);
        } else {
            dispatch(setMessage({text: "Incorrect OTP!", class: "danger", code: 400}));
        }
    };

    return (
        <div className='container auth-page'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 m-auto'>
                    <h1>OTP check</h1>
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
                                placeholder='Enter OTP'
                                name='otp'
                                value={otp}
                                onChange={e=>onChange(e)}
                                required
                                maxLength={6}
                            />
                        </div>
                        <button className='btn btn-primary w-100' type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Otp;
