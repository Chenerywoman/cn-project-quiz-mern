import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import scrambleAnswers from  '../helpers';

const Quiz = () => {

    const [questions, setQuestions] = useState([])

    // this will be passed down from App state in future iteration
    const [category, setCategory] = useState('')

    // this will be passed down from App state in future iteration
    const [level, setLevel] = useState('')

    const scrambleAnswers = (questions) => {

        const questionandAnswers = questions.reduce((acc, curr) => {
    
            let answers = [{answer: curr.correct_answer, correct: true}, {answer: curr.incorrect_answers[0], correct:false}, {answer: curr.incorrect_answers[1], correct:false}, {answer: curr.incorrect_answers[2], correct:false}];
            let mixedAnswers = [];
            
            let num = 4;
            
            for (let i = 0; i < 4; i++){
    
                let randInt = Math.floor(Math.random() * num);
    
                num--
    
                mixedAnswers.push(answers[randInt]);
                answers.splice(randInt, 1)
    
            }
    
            acc.push({question: curr.question, answers: mixedAnswers});
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

    useEffect(() => fetchQuestions(), [])


    return (
      <div>
        <h1>Quiz Page</h1>
        <h2>Category:{category} </h2>
        <h2>Difficulty:{level}</h2>
            <form>
                {questions.map((question, ind) => {
                    return (
                            <div key={ind} >
                                <p> {question.question} </p>
                                {question.answers.map((answer, ind) => {
                                    return(
                                        <div key={ind}>
                                            <label htmlFor={ind}>{answer.answer}</label>
                                            <input type="radio" name={ind} value={answer.correct} />
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
