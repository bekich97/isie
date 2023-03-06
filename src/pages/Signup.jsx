import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../stores/messageSlice';
import MyAlert from '../components/MyAlert';
import { signup } from '../actions/auth';

const Signup = () => {
    const [formData, setFormData] = useState({
        phone: "",
        nickname: "",
        name: "",
        password: "",
        re_password: ""
    });
    const dispatch = useDispatch();
    const message = useSelector(state => state.messageSlice.message);
    const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        
        if(isAuthenticated){
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const {phone, nickname, name, password, re_password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(phone, nickname, name, password, re_password, dispatch);
        } else {
            dispatch(setMessage({text: "Passwords must match!", class: "danger", code: 400}));
        }
    };

    return (
        <div className='container mt-5 auth-page'>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 m-auto'>
                    <h1>Sign up</h1>
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
                                type="text" 
                                placeholder='Nickname'
                                name='nickname'
                                value={nickname}
                                onChange={e=>onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="text" 
                                placeholder='Name'
                                name='name'
                                value={name}
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
                        <div className='form-group my-2'>
                            <input 
                                className='form-control'
                                type="password" 
                                placeholder='Confirm Password'
                                name='re_password'
                                value={re_password}
                                onChange={e=>onChange(e)}
                                minLength={6}
                                required
                            />
                        </div>
                        <button className='btn btn-primary' type='submit'>Register</button>
                    </form>
                    <p className='mt-3'>
                        Already have an account? &nbsp;<Link className='badge bg-secondary' to='/signin'>SIGN IN</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
