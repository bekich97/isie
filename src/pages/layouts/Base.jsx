import React, { useEffect } from 'react';
import Navbar from '../partials/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { load_user } from '../../actions/auth';

const Base = (props) => {
    const dispatch = useDispatch();
    const showSpinner = useSelector(state => state.mainSlice.showSpinner);

    useEffect(() => {
        load_user(dispatch);
    }, [dispatch]);

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <Navbar />
                    </div>
                </div> 
            </div>
            {props.children}
            {
                showSpinner ?
                <div id='spinner-wrapper'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                :
                ""
            }
        </div>
    );
}

export default Base;
