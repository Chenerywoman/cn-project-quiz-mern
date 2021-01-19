import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import Timer from './Timer';

const Quiz = (props) => {

  const history = useHistory();
  
    const {
        category,
        difficulty,
    } = props;
   
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [categoryName, setCategoryName] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    // const [hasRefreshed, setHasRefreshed] = useState(false);
    const [sessionToken, setSessionToken] = useState("");

    const getSessionToken = useCallback(async () => {  
      console.log('in get session token') 
      const sessionTokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
      setSessionToken(sessionTokenResponse.data.token);
    }, []);
  
    const updateSessionToken = useCallback (async (token) => {
      console.log('in update session token')
      const updatedSessionTokenResponse = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
      setSessionToken(updatedSessionTokenResponse.data.token)
    });
  
    const getTimeTaken = useCallback((time) => {

      setTimeTaken(time);
    }, [])
    
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
            categoryName = "Music"; 
            break;
          case "13": 
            categoryName = "Musicals and Theatres"; 
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

    const decodeText = (encodedText) => {

          let text = document.createElement('textarea');
          text.innerHTML = encodedText;
          let decodedText = text.value;

          return decodedText;

      };

      const scrambledAnswersCallBack = useCallback(
        (questions) => {
        
        const questionsandAnswers = questions.reduce((acc, curr, ind) => {
    
            let answers = [{answer: decodeText(curr.correct_answer), correct: true, selected: false}, {answer: decodeText(curr.incorrect_answers[0]), correct:false, selected: false}, {answer: decodeText(curr.incorrect_answers[1]), correct:false, selected: false}, {answer: decodeText(curr.incorrect_answers[2]), correct:false, selected: false}];
            let mixedAnswers = [];
            
            let num = 4;
            
            for (let i = 0; i < 4; i++){
    
                let randInt = Math.floor(Math.random() * num);
    
                num--
    
                mixedAnswers.push(answers[randInt]);
                answers.splice(randInt, 1)
    
            }
    
            acc.push({number: `Question${ind}`, question: decodeText(curr.question), answers: mixedAnswers});
           return acc;
    
        }, [])

        return questionsandAnswers;
    
    },
    []
  )

    const onRadioChange = (answerInd, questionInd, event) => {

        // update answers with true or false
        let correctOrIncorrect = questions[questionInd].answers[answerInd].correct;
        const answersPlaceholder = [...answers]
        answersPlaceholder.splice(questionInd, 1, correctOrIncorrect);

        setAnswers(answersPlaceholder)
    }

    const formHandler = async (event) => {
        
        event.preventDefault();

        const score = answers.reduce((acc, curr, ind, arr) => {

            return curr ? acc + 1 : acc;

        }, 0);

        const body = {
            score: score,
            time: timeTaken,
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

        if (response.data.message === "Results logged") {

          history.push('/profile');

        } else if (response.data.message === "not logged-in"){

          history.push('/')
        }

    }

    const fetchQuestions = useCallback(async () => {
      console.log('in fetch questions')
      getCategoryName(category)

      try {

        if (sessionToken) {
            console.log('in sessionToken if')

            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`);
            console.log(response)

            if (response.data && response.data.response_code === 1) {

                console.log("in response code 1 if ");
                console.log(response);
                setNoResults(true);

            } else if (response.data && response.data.response_code === 2) {

              console.log("in response code 2 else if");
              console.log(response)
              setNoResults(true);

            } else if (response.data && response.data.response_code === 3) {

                console.log("in response code 3 else if ");
                getSessionToken();

            } else if (response.data && response.data.response_code === 4) {

                console.log("in response code 4 else if ");

               updateSessionToken(sessionToken)

            }

            let questionsAndScrambledAnswers = scrambledAnswersCallBack(response.data.results);

            setQuestions(questionsAndScrambledAnswers);

        } else {
          console.log("in session token else");
          getSessionToken();

        }

      } catch (error) {
        console.log("in error block")
        console.log(error)
        setNoResults(true);
      }

    },[category, difficulty, getSessionToken,scrambledAnswersCallBack, sessionToken]);

    useEffect(() => {
      console.log('session token in useEffect')
      console.log(sessionToken)

      fetchQuestions()
      
      
    }, [sessionToken, getSessionToken, category, difficulty, scrambledAnswersCallBack, noResults, fetchQuestions])

      console.log(sessionToken)
      if (noResults) {
        return <Redirect to = "/error" / >
      } 
        return (
          <div>
            <h1>Quiz Page</h1>
            <h2>Category:{categoryName} </h2>
            <h2>Difficulty:{difficulty}</h2> 
           
              Timer:<Timer getTimeTaken={getTimeTaken}/>
                <form onSubmit={formHandler}>
                    {questions.map((question, questionInd) => {
                        return (
                                <div key={questionInd} >
                                    <p> {question.question} </p>
                                    {question.answers.map((answer, answerInd) => {
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
