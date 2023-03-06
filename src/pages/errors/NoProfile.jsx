import React from 'react';
import { Link } from 'react-router-dom';

const NoProfile = () => {
    return (
        <div>
            No Profile found!
            <Link to="/">Home</Link>
        </div>
    );
}

export default NoProfile;
