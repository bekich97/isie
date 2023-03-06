import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password_request } from '../actions/auth';
import { setMessage } from '../stores/messageSlice';
import MyAlert from '../components/MyAlert';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: ""
    });
    const message = useSelector(state => state.messageSlice.message);

    const {phone} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (phone) {
            reset_password_request(phone, dispatch, navigate);
        } else {
            dispatch(setMessage({text: "Phone number is required!", class: "danger", code: 400}));
        }
    };

    return (
        <div className='container mt-5 auth-page'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 m-auto'>
                    <h1>Request Password Reset</h1>
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
                                type="phone" 
                                placeholder='Phone'
                                name='phone'
                                value={phone}
                                onChange={e=>onChange(e)}
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

export default ResetPassword;
