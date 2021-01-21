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
        for (let i = 0; i < newArr.length; i++) {
            let difficulty = newArr[i].difficulty;
            let difficultyCap;
            switch (difficulty) {
                case "easy":
                    difficultyCap = "Easy";
                    break;
                case "medium":
                    difficultyCap = "Medium";
                    break;
                case "hard":
                    difficultyCap = "Hard";
                    break;
            };
            newArr[i].difficulty = difficultyCap;
        }
        console.log(newArr);
        setTopTen(newArr);
        
    };
    console.log(topTen);

    return (
        <div class="page" id="league" >
            <h3>League Table</h3>
            <h1 id="top10" >Top 10</h1>
            <table id="table" >
                <tr>
                    <th class="header" >Position</th>
                    <th class="header" >Score</th>
                    <th class="header" >Time</th>
                    <th class="header" >User</th>
                    <th class="header" >Category</th>
                    <th class="header" >Difficulty</th>
                </tr>
                {topTen.map((topTen) => {
                    return (
                        <tr>
                            <td class="data" id="position" >{topTen.position}</td>
                            <td class="data" >{topTen.score}</td>
                            <td class="data" >{topTen.time}</td>
                            <td class="data" >{topTen.user.name}</td>
                            <td class="data" >{topTen.category}</td>
                            <td class="data" >{topTen.difficulty}</td>
                        </tr>
                    )
                } )}
                
            </table>
        </div>
    )
}

export default League
