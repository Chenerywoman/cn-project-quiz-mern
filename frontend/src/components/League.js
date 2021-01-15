import React, {useEffect, useState} from 'react';
import axios from 'axios';

const League = () => {
    const [user, setUser] = useState({});
    const [result, setResult] = useState({});

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const response = await axios.get('/league');
        setUser(response.data.users);
        setResult(response.data.results);

    };


    return (
        <div>
            <h3>League Table</h3>
            <h1>Top 10</h1>
            <div id="table-container" >
                <tr>
                    <th>Position</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>{result.score}</td>
                    <td>{result.time}</td>
                    <td>{user.name}</td>
                    <td>{result.category}</td>
                    <td>{result.difficulty}</td>
                </tr>
            </div>
        </div>
    )
}

export default League
