import React, {useEffect, useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
    const [user, setUser] = useState({});
    const [result, setResult] = useState({});
  
    useEffect(() => {
        fetchData();
    }, []);

    const history = useHistory();

    const fetchData = useCallback (async () => {
        
        const response = await axios.get('/profile');

        if(response.data.message === "user not found" || response.data.message === "login not found" ) {
            history.push('/login');
        } else {
            setUser(response.data.users);
            setResult(response.data.results);
        };
        

    },[history]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div>
            <h1>Profile Page</h1>

            <div id="left-side" >
                <div id="personal-info">
                    <h3>Your Information</h3>

                    <h5>Name: </h5>
                    <p>{user.name}</p>

                    <h5>Email: </h5>
                    <p>{user.email}</p>
                </div>  

                <div id="stats-info">
                    <h3>Your Stats</h3>

                    <h5>Quizzes Taken</h5>
                    <p>{result.totalQuiz}</p>

                    <h5>Total Score: </h5>
                    <p>{result.totalScore}</p>

                    <h5>Average Score: </h5>
                    <p>{result.AvScore}</p>

                    <h5>Fastest Time: </h5>
                    <p>{result.fastTime}</p>

                    <h5>Average Time: </h5>
                    <p>{result.avTime}</p>

                    {/* <h5>Ranking: </h5>
                    <p>{result.position}</p> */}
                </div>    
            </div>

            <div id="right-side" >
                {//<div id="leaderboard-info">{/*Require if statement*/}
                }
                    {//<h2>Congratulations!</h2>
                    }
                    {//<h5>You are {result.topPosition} on the Leaderboard</h5>
                    }
                {//</div>}  
                }

                <div id="last-quiz-info">
                    <h3>The Results of Your Last Quiz are:</h3>

                    <h5>Score: </h5>
                    <p>{result.score}</p>

                    <h5>Time: </h5>
                    <p>{result.time}</p>

                    <h5>The Category you chose was: </h5>
                    <p>{result.category}</p>

                    <h5>The Difficulty you chose was: </h5>
                    <p>{result.difficulty}</p>
                </div>   
            </div>

        </div>
    )
}

export default Profile
