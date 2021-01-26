import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const history = useHistory();

    const fetchData = async () => {
        
        const response = await axios.get('/logout');
        console.log(response.data.message)
        if(response.data.message === "Logged Out") {
            console.log("Redirecting")
            history.push('/');
        };
    };

    return (
        <div id="logout" >
            <p>You are logged out.</p>
        </div>
    )
}

export default Logout
