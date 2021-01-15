import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import scrambleAnswers from  '../helpers';

const Quiz = (props) => {
  
    const {
        category,
        difficulty,
        sessionToken,
        getSessionToken, 
        updateSessionToken
    } = props
   
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [categoryName, setCategoryName] = useState("");
    // const [backendResponse, setBackendResponse] = useState("");
    

    const getCategoryName = (catNumber) => {

        let categoryName = "";
        
        switch (catNumber){
          case "9": 
           categoryName = "General Knowledge";
            break;
          case "10":
            categoryName = "Books";
            break;
          case "11":
            categoryName = "Film";
            break;
          case "12":
            categoryName = "Music"
            break;
          case "13":
            categoryName = "Musicals and Theatre";
            break;
          case "14":
            categoryName = "Television";
            break;
          case "15":
            categoryName = "Video Games";
            break;
          case "16":
            categoryName = "Board Games";
            break;
          case "17":
            categoryName = "Science and Nature";
            break;
          case "18":
            categoryName = "Computers";
            break;
          case "19":
            categoryName = "Mathematics";
            break;
          case "20":
            categoryName = "Mythology";
            break;
          case "21":
            categoryName = "Sports";
            break;
          case "22":
            categoryName = "Geography"
            break;
          case "23":
            categoryName = "History";
            break;
          case "24":
            categoryName = "Politics";
            break;
          case "25":
            categoryName = "Art";
            break;
          case "26":
            categoryName = "Celebrities";
            break;
          case "27":
            categoryName = "Animals";
            break;
          case "28":
            categoryName = "Vehicles";
            break;
          case "29":
            categoryName = "Comics";
            break;
          case "30":
            categoryName = "Gadgets";
            break;
          case "31":
            categoryName = "Japanese Amime and Manga"
            break;
          case "32":
            categoryName = "Cartoon and Animation";
            break;
          default:
            categoryName = ""
        }
         
        setCategoryName(categoryName);
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
      console.log('in fetch questions')
      getCategoryName(category)

      try {

        if (sessionToken) {
              
              console.log(sessionToken)

              const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`);
              console.log(response)

              if (response.data.response_code == 4) {

                  updateSessionToken(sessionToken)
              }

              let questionsAndScrambledAnswers = scrambleAnswers(response.data.results);
    
              setQuestions(questionsAndScrambledAnswers);

            } else {
              console.log("in session token else")
              getSessionToken()

              // const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`);
              // let questionsAndScrambledAnswers = scrambleAnswers(response.data.results);
    
              // setQuestions(questionsAndScrambledAnswers);

            }
            
        } catch (error) {
            console.log(error)
        }

    }

    const onRadioChange = (answerInd, questionInd, event) => {

        let correctOrIncorrect = questions[questionInd].answers[answerInd].correct;
        // let check = event.target.value;

        const answersPlaceholder = [...answers]
        answersPlaceholder.splice(questionInd, 1, correctOrIncorrect);

        setAnswers(answersPlaceholder)

    }

    const formHandler = async (event) => {

        event.preventDefault();

        const score = answers.reduce((acc, curr, ind, arr) => {

            return curr ? acc + 1 : acc;

        }, 0);

        console.log(score)

        const body = {
            score: score,
            category: categoryName,
            difficulty: difficulty
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

    useEffect(() => fetchQuestions(), [sessionToken])

    console.log(sessionToken)
    return (
      <div>
        <h1>Quiz Page</h1>
        <h2>Category:{categoryName} </h2>
        <h2>Difficulty:{difficulty}</h2> 
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
