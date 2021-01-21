import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendResponse, setBackendResponse] = useState("");


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        const response = await axios.get('/login');

        if(response.data.message === "Already logged in") {

            history.push('/profile');
        };
    };

    const history = useHistory();

    const formHandler = async (event) => {
        event.preventDefault();

        console.log(email);
        console.log(password);

        const body = {
            userEmail: email,
            userPassword: password
        };

        console.log(body);

        const config = {
            headers: {
                'Content-Type': 'application/json'
                }
        };

        const response = await axios.post('/login', body, config);

        setBackendResponse(response.data.message);
        console.log(response.data.message);

        if(response.data.message === "Login Successful" || response.data.message === "Already logged in") {
            history.push('/profile');
        };
    };

    return (
        <div class="page" id="login" >

            <h1 id="login-head" >Login</h1>

            <form onSubmit={formHandler} >
                <div>
                    <label>User Email</label> <br />
                    <input required class="login" type="email" name="userEmail" onChange={(e) => setEmail(e.target.value)} /><br />

                    <label>User Password</label> <br />
                    <input required class="login" type="password" name="userPassword" onChange={(e) => setPassword(e.target.value)} /><br />
                </div>

                <button id="login-submit" type="submit" >Login</button>

            </form>
            { backendResponse }
            
        </div>
    )
}

export default Login
