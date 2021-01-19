import React, {useEffect, useState} from 'react';
import axios from 'axios';

const League = () => {
    const [rows, setRows] = useState([{position: 1,}, {position: 2,}, {position: 3,}, {position: 4,}, {position: 5,}, {position: 6,}, {position: 7,}, {position: 8,}, {position: 9,}, {position: 10,}]); 
    const [topTen, setTopTen] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const response = await axios.get('/league');

        let newArr = [];
        for (let i = 0; i < response.data.results.length; i++) {
            let newObj = {
                ...rows[i],
                ...response.data.results[i]
            }
            newArr.push(newObj);
        };
        setTopTen(newArr);
        
    };
    console.log(topTen);

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
                {topTen.map((topTen) => {
                    return (
                        <tr>
                            <td>{topTen.position}</td>
                            <td>{topTen.score}</td>
                            <td>{topTen.time}</td>
                            <td>{topTen.user.name}</td>
                            <td>{topTen.category}</td>
                            <td>{topTen.difficulty}</td>
                        </tr>
                    )
                } )}
                
            </div>
        </div>
    )
}

export default League
