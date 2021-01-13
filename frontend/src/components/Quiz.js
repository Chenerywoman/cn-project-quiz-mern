import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Quiz = () => {

    const [questions, setQuestions] = useState([])


    const fetchQuestions = async () => {

        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple');

        console.log('response')
        console.log(response.data.results)

        let receivedQuestions = [...response.data.results];

        setQuestions(receivedQuestions);

        console.log('questions')
        console.log(questions)



    }

    useEffect(() => fetchQuestions(), [])


    return (
        <div>
        <h1>Quiz Page</h1>
        <h2>Category:{} </h2>
        <form>

        </form>
            
        </div>
    )
}

export default Quiz
