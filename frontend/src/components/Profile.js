import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Profile = () => {
    const [users, setUsers] = useState();


    const fetchData = async () => {
        const response = await axios.get('/api/profile');
        console.log(response.data.users.name);
        console.log(response.data.results.time);
        // setUsers(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1>Profile Page</h1>

            <div id="left-side" >
                <div id="personal-info">
                    <h3>Your Information</h3>

                    <h5>Name: </h5>
                    {/* <p>{name}</p> */}

                    <h5>Email: </h5>
                    {/* <p>{email}</p> */}
                </div>  

                <div id="stats-info">
                    <h3>Your Stats</h3>

                    <h5>x Quizzes Taken</h5>
                    {/* <p>{totalQuiz}</p> */}

                    <h5>Total Score: </h5>
                    {/* <p>{totalScore}</p> */}

                    <h5>Average Score: </h5>
                    {/* <p>{AvScore}</p> */}

                    <h5>Fastest Time: </h5>
                    {/* <p>{fastTime}</p> */}

                    <h5>Average Time: </h5>
                    {/* <p>{avTime}</p> */}

                    <h5>Ranking: </h5>
                    {/* <p>{position}</p> */}
                </div>    
            </div>

            <div id="right-side" >
                <div id="leaderboard-info">{/*Require if statement*/}
                    <h2>Congratulations!</h2>
                    <h5>You are {/*topPosition*/} on the Leaderboard</h5>
                </div>  

                <div id="last-quiz-info">
                    <h3>The Results of Your Last Quiz are:</h3>

                    <h5>Score: </h5>
                    {/* <p>{score}</p> */}

                    <h5>Time: </h5>
                    {/* <p>{time}</p> */}

                    <h5>The Category you chose was: </h5>
                    {/* <p>{category}</p> */}

                    <h5>The Difficulty you chose was: </h5>
                    {/* <p>{difficulty}</p> */}
                </div>   
            </div>

        </div>
    )
}

export default Profile
