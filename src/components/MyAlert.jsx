import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../stores/messageSlice';

const MyAlert = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setMessage(null));
        }, 5000);
    }, [dispatch]);

    const removeMessage = () => {
        dispatch(setMessage(null));
    }
    return (
        <div className={`alert alert-${props.status_class}`}>
            {props.text}
            <span className="material-icons-outlined" onClick={() => removeMessage()}>close</span>
        </div>
    );
}

export default MyAlert;
