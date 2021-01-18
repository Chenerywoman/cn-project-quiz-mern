import React, {useEffect, useState} from 'react';
import axios from 'axios';

const League = () => {
    const [user, setUser] = useState({});
    const [result, setResult] = useState({});
    const [rows, setRows] = useState([{position: 1,}, {position: 2,}, {position: 3,}, {position: 4,}, {position: 5,}, {position: 6,}, {position: 7,}, {position: 8,}, {position: 9,}, {position: 10,}]); 
    
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
                {rows.map((row) => {
                    return (
                        <tr>
                            <td>{row.position}</td>
                            <td>{/*result.score*/}</td>
                            <td>{/*result.time*/}</td>
                            <td>{/*user.name*/}</td>
                            <td>{/*result.category*/}</td>
                            <td>{/*result.difficulty*/}</td>
                        </tr>
                    )
                } )}
                
            </div>
        </div>
    )
}

export default League
