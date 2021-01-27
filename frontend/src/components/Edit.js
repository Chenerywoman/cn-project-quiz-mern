import React, {useEffect, useState, useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [backendResponse, setBackendResponse] = useState("");
  
    const history = useHistory();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        
        const response = await axios.get('/edit');

        setName(response.data.name);
        setEmail(response.data.email);
        setIsLoading(false);
    }, [history]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formHandler = async (event) => {
        event.preventDefault();

        const body = {
            userName: name,
            userEmail: email
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
                }
        };

        const response = await axios.post('/edit', body, config);

        setBackendResponse(response.data.message);

        if(response.data.message === "User updated") {
            history.push('/profile');
        };

    };

    return (
        <div class="page" >
            <h1 id="edit-head" >Edit Profile</h1>
            {isLoading ? <p>...loading</p> : 
                <div>
                    <form onSubmit={formHandler} >
                        <label>Name</label>
                        <input required type="text" name="userName" value={name} onChange={(e) => setName(e.target.value)} /><br />

                        <label>Email</label>
                        <input required type="email" name="userEmail" value={email} onChange={(e) => setName(e.target.value)} /><br />
                
                        <button type="submit" >Update</button>
                    </form>
                    <div id="pwrd" >
                        <Link to="/password" ><button>Edit Password</button></Link>
                    </div>    
                </div>             
            }
        </div>
    )
}

export default Edit
