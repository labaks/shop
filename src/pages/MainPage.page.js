import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export const MainPage = () => {

    const [userName, setUserName] = useState('username');

    return (
        <div className="mainPage">
            <div className="header">
                <Link className="logo" to={'/'}>
                    <img src="logo192.png" alt="logo" />
                </Link>
                <div className="headerRightBlock">
                    <Link className="profileLink" to={'/profile'}>
                        <span className='userName marginR10'>{userName}</span>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                </div>
            </div>
            <div className="contentWrapper">
                <div className="mainBlock">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}