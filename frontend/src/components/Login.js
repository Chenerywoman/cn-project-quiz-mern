import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendResponse, setBackendResponse] = useState("");

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

        if(response.data.message === "Login Successful") {
            history.push('/profile');
        };

    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={formHandler} >
                <label>User Email</label> <br />
                <input required type="email" name="userEmail" onChange={(e) => setEmail(e.target.value)} /><br />

                <label>User Password</label> <br />
                <input required type="password" name="userPassword" onChange={(e) => setPassword(e.target.value)} /><br />

                <button type="submit" >Login</button>

            </form>
            { backendResponse }
            
        </div>
    )
}

export default Login
