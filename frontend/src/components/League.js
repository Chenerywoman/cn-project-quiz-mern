import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const League = () => {
    const [rows, setRows] = useState([{position: 1,}, {position: 2,}, {position: 3,}, {position: 4,}, {position: 5,}, {position: 6,}, {position: 7,}, {position: 8,}, {position: 9,}, {position: 10,}]); 
    const [topTen, setTopTen] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback (async () => {
        setIsLoading(true);
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
                default:
                    difficultyCap = "";
            };
            newArr[i].difficulty = difficultyCap;
        }
        setTopTen(newArr);
        setIsLoading(false);
    }, [rows]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className="page" id="league" >
            <h3>League Table</h3>
            <h1 id="top10" >Top 10</h1>
            {isLoading ? <p>...loading</p> : 
            <table id="table" >
                <tbody>
                <tr>
                    <th className="header" >Position</th>
                    <th className="header" >Score</th>
                    <th className="header" >Time</th>
                    <th className="header" >User</th>
                    <th className="header" >Category</th>
                    <th className="header" >Difficulty</th>
                </tr>
                {topTen.map((topTen, ind) => {
                    return (
                        <tr key={ind}>
                            <td className="data" id="position" >{topTen.position}</td>
                            <td className="data" >{topTen.score}</td>
                            <td className="data" >{topTen.time}</td>
                            <td className="data" >{topTen.user.name}</td>
                            <td className="data" >{topTen.category}</td>
                            <td className="data" >{topTen.difficulty}</td>
                        </tr>
                    )
                } )}
                </tbody>
            </table>
            }
        </div>
    )
}

export default League
