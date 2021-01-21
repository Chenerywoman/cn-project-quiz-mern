import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conf, setConf] = useState("");
    const [backendResponse, setBackendResponse] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        
        const response = await axios.get('/register');

        if(response.data.message === "Already logged in") {
            history.push('/profile');
        };
    };

    const history = useHistory();

    const formHandler = async (event) => {
        event.preventDefault();

        console.log(name);
        console.log(email);
        console.log(password);

        const body = {
            userName: name,
            userEmail: email,
            userPassword: password,
            confPassword: conf
        };

        console.log(body);

        const config = {
            headers: {
                'Content-Type': 'application/json'
                }
        };

        const response = await axios.post('/register', body, config);

        setBackendResponse(response.data.message);
        console.log(response.data.message);

        if(response.data.message === "User registered") {
            history.push('/login'); //change to login
        };

    };

    return (
        <div class="page" >
            <h1 id="register-head" >Register User</h1>

            <form onSubmit={formHandler} >
                <div>
                    <label>User Name</label> <br />
                    <input required class="register" type="text" name="userName" onChange={(e) => setName(e.target.value)} /><br />

                    <label>User Email</label> <br />
                    <input required class="register" type="email" name="userEmail" onChange={(e) => setEmail(e.target.value)} /><br />

                    <label>User Password</label> <br />
                    <input required class="register" type="password" name="userPassword" onChange={(e) => setPassword(e.target.value)} /><br />

                    <label>Confirm Password</label> <br />
                    <input class="register bottom" required type="password" name="confPassword" onChange={(e) => setConf(e.target.value)} /><br />
                    <p class="error" >{ backendResponse }</p>
                </div>

                <button type="submit" >Register</button>
            </form>
        </div>
    )
}

export default Register
