import React, {useEffect, useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Password = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conf, setConf] = useState("");
    const [backendResponse, setBackendResponse] = useState("");
  
    const history = useHistory();

    const formHandler = async (event) => {
        event.preventDefault();

        const body = {
            userPassword: password,
            newPassword: newPassword,
            confPassword: conf
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
                }
        };

        const response = await axios.post('/password', body, config);
        
        setBackendResponse(response.data.message);

        if(response.data.message === "Password Updated") {
            history.push('/profile');
        };

    };

    return (
        <div class="page" >
            <h1 id="pwrd-head" >Edit Password</h1>
            <div>
                <form onSubmit={formHandler} >
                    <label>Current Password</label>
                    <input required type="password" name="userPassword" onChange={(e) => setPassword(e.target.value)} /><br />

                    <label>New Password</label>
                    <input required type="password" name="newPassword" onChange={(e) => setNewPassword(e.target.value)} /><br />

                    <label>Confirm New Password</label>
                    <input required type="password" name="confPassword" onChange={(e) => setConf(e.target.value)} /><br />
            
                    <p class="error" >{ backendResponse }</p>

                    <button type="submit" >Update</button>
                </form> 
            </div>             
        </div>
    )
}

export default Password
