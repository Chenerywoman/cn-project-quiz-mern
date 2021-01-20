import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div id="home">
            <h1 id="home-head">The Quiz of Awesomeness</h1>
            <p class="home" >You might beat our quiz but will you ever beat our members?</p>
            <div id="buttoncontainer-home">
                <Link to="/register" ><button>Register</button></Link>
                <Link to="/login" ><button>Login</button></Link>
            </div>
        </div>
    )
}

export default Home
