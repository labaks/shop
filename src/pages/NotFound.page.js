import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className='content'>
            <div className='pageTitle'>
                <span>SORRY, THE PAGE DOES NOT EXIST</span>
            </div>
            <span>yet</span>
            <div>
                <Link to={'/'}>Go to main</Link>
            </div>
        </div>
    );
}