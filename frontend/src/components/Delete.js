import React, {useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Delete = () => {
    const history = useHistory();
    
    const fetchData = useCallback(async () => {
        
        const response = await axios.get('/delete');
        console.log(response.data.message)
        if(response.data.message === "User deleted") {
            console.log("Redirecting")
            history.push('/');
        };
    }, [history]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div id="delete" >
            <p>User and Results deleted</p>
        </div>
    )
}

export default Delete
