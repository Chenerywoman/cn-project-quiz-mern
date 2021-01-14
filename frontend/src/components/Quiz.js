import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import scrambleAnswers from  '../helpers';

const Quiz = () => {

     // this will be passed down from App state in future iteration
    const [category, setCategory] = useState('');
     // this will be passed down from App state in future iteration
    const [level, setLevel] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [backendResponse, setBackendResponse] = useState("");

    const scrambleAnswers = (questions) => {

        const questionandAnswers = questions.reduce((acc, curr, ind) => {
    
            let answers = [{answer: curr.correct_answer, correct: true, selected: false}, {answer: curr.incorrect_answers[0], correct:false, selected: false}, {answer: curr.incorrect_answers[1], correct:false, selected: false}, {answer: curr.incorrect_answers[2], correct:false, selected: false}];
            let mixedAnswers = [];
            
            let num = 4;
            
            for (let i = 0; i < 4; i++){
    
                let randInt = Math.floor(Math.random() * num);
    
                num--
    
                mixedAnswers.push(answers[randInt]);
                answers.splice(randInt, 1)
    
            }
    
            acc.push({number: `Question${ind}`, question: curr.question, answers: mixedAnswers});
           return acc;
    
        }, [])
        return questionandAnswers;
        
    
    };

    const fetchQuestions = async () => {

        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple');

            let questionsAndScrambledAnswers = scrambleAnswers(response.data.results);
    
            setQuestions(questionsAndScrambledAnswers);
            setCategory(response.data.results[0].category);
            setLevel(response.data.results[0].difficulty);


        } catch (error) {
            console.log(error)
        }

    }

    const onRadioChange = (answerInd, questionInd, event) => {

        let correctOrIncorrect = questions[questionInd].answers[answerInd].correct;
        let check = event.target.value;

        const answersPlaceholder = [...answers]
        answersPlaceholder.splice(questionInd, 1, correctOrIncorrect)

        setAnswers(answersPlaceholder)
    }

    const formHandler = async (event) => {

        event.preventDefault();
    
        console.log(answers)

        const body = {
            answers: answers
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post('/quiz', body, config);
        console.log(response);

        // setBackendResponse(response.data.message)

    }

    useEffect(() => fetchQuestions(), [])

    // console.log(questions)
    // console.log(answers)
    return (
      <div>
        <h1>Quiz Page</h1>
        <h2>Category:{category} </h2>
        <h2>Difficulty:{level}</h2>
            <form onSubmit={formHandler}>
                {questions.map((question, questionInd) => {
                    return (
                            <div key={questionInd} >
                                <p> {question.question} </p>
                                {question.answers.map((answer, answerInd, arr) => {
                                    return(
                                        <div key={answerInd}>
                                            <label htmlFor={question.number}>{answer.answer}</label>
                                            <input type="radio" name={question.number} value={answer.correct} onChange={(event) => onRadioChange(answerInd, questionInd, event)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
                <input type="submit" value="Submit" />
            </form>            
        </div>
    )
}

export default Quiz
