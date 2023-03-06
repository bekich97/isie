import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setMessage } from '../stores/messageSlice';
import MyAlert from '../components/MyAlert';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/auth';

const Signin = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    });
    const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("reset_password_phone");

        if(isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const message = useSelector(state => state.messageSlice.message);

    const {phone, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (phone && password) {
            signin(phone, password, dispatch);
        } else {
            dispatch(setMessage({text: "Phone number and password are required!", class: "danger", code: 400}));
        }
    };

    return (
        <div className='container mt-5 auth-page'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 m-auto'>
                    <h1>Sign in</h1>
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
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="password" 
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e=>onChange(e)}
                                minLength={6}
                                required
                            />
                        </div>
                        <div className="form-check my-2">
                            <input className="form-check-input" type="checkbox" id="remember-me" />
                            <label className="form-check-label" htmlFor="remember-me">
                                Remember me?
                            </label>
                        </div>
                        <button className='btn btn-primary' type='submit'>Sign in</button>
                        <div className='forgot-password-wrapper'>
                            <Link to='/reset-password' className='forgot-password'>Forgot password?</Link>
                        </div>
                    </form>
                    <p className='mt-3'>
                        Don't have an account? <Link className='badge bg-secondary' to='/signup'>SIGN UP</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
