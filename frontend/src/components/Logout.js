import React, {useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Logout = () => {

    const history = useHistory();
    
    const fetchData = useCallback(async () => {
        
        const response = await axios.get('/logout');
        console.log(response.data.message)
        if(response.data.message === "Logged Out") {
            console.log("Redirecting")
            history.push('/');
        };
    }, [history]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div id="logout" >
            <p>You are logged out.</p>
        </div>
    )
}

export default Logout
