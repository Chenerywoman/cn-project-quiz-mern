import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import scrambleAnswers from  '../helpers';

const Quiz = () => {

    const [questions, setQuestions] = useState([]);

    // this will be passed down from App state in future iteration
    const [category, setCategory] = useState('');

    // this will be passed down from App state in future iteration
    const [level, setLevel] = useState('');

    const [answers, setAnswers] = useState([false, false, false, false, false, false, false, false, false, false])

    const onRadioChange = (answerInd, questionInd, event) => {

        let correctOrIncorrect = questions[questionInd].answers[answerInd].correct;
        let check = event.target.value;

        const answersPlaceholder = [...answers]
        answersPlaceholder.splice(questionInd, 1, correctOrIncorrect)

        setAnswers(answersPlaceholder)
    }

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

    useEffect(() => fetchQuestions(), [])

    // console.log(questions)
    console.log(answers)
    return (
      <div>
        <h1>Quiz Page</h1>
        <h2>Category:{category} </h2>
        <h2>Difficulty:{level}</h2>
            <form>
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
