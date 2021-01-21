import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <Link to="/" id="nav-links" >Home</Link>
            <Link to="/selection" id="nav-links" >Select Quiz</Link>
            <Link to="/profile" id="nav-links" >Profile</Link>
            <Link to="/league" id="nav-links" >League Table</Link>
            <Link to="/logout" id="nav-links" >Logout</Link>
        </nav>
    )
}

export default Nav
