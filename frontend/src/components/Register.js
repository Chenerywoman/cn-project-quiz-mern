import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conf, setConf] = useState("");
    const [backendResponse, setBackendResponse] = useState("");

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
            history.push('/profile'); //change to login
        };

    };

    return (
        <div>
            <h1>Register User</h1>

            <form onSubmit={formHandler} >
                <label>User Name: </label>
                <input required type="text" name="userName" onChange={(e) => setName(e.target.value)} /><br />

                <label>User Email: </label>
                <input required type="email" name="userEmail" onChange={(e) => setEmail(e.target.value)} /><br />

                <label>User Password: </label>
                <input required type="password" name="userPassword" onChange={(e) => setPassword(e.target.value)} /><br />

                <label>Confirm Password: </label>
                <input required type="password" name="confPassword" onChange={(e) => setConf(e.target.value)} /><br />

                <button type="submit" >Register</button>
            </form>
            { backendResponse }
        </div>
    )
}

export default Register
