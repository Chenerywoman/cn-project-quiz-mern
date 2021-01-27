import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import Timer from './Timer';
import Popup from './Popup';

const Quiz = (props) => {

    const {
        category,
        difficulty,
        categoryName,
        getSessionToken,
        updateSessionToken,
        sessionToken
    } = props;
    
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [noResults, setNoResults] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [tokenChanged, setTokenChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const checkIfLoggedIn = useCallback(async () => {

      const response = await axios.get('/quiz');
      console.log(response)
      if(response.data === "Not logged in") {

          history.push('/');
      };
  }, [history]);

    const getNoOfQuestions = useCallback(async () => {

      let number = 0;

      try {
        const noOfQuestionsResponse = await axios.get(`https://opentdb.com/api_count.php?category=${category}`);
        console.log(noOfQuestionsResponse);

        if (difficulty === 'easy') {

          number = noOfQuestionsResponse.data.category_question_count.total_easy_question_count;
            
        } else if (difficulty === 'medium') {

          number = noOfQuestionsResponse.data.category_question_count.total_medium_question_count;

        } else if (difficulty === 'hard') {
          
          number = noOfQuestionsResponse.data.category_question_count.total_hard_question_count;

        }

        let noOfQuestions = 10;

        if (number < 10) {
  
          noOfQuestions = number;
  
        }
        
        return noOfQuestions; 

        } catch (error) {
          console.log(error)
        
        }
          
    }, [category, difficulty])

    const fetchQuestions  = useCallback(async (number) => {
      console.log('in fetch questions')
      console.log(number)
        
      try {
        console.log(categoryName)
        console.log(category)
        console.log(difficulty)
        console.log(number)

        const response = await axios.get(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}&encode=url3986`);
        console.log(response)
        return response; 

      } catch (error) {
        console.log(error)
        history.push('/error')
      }

    }, [category, difficulty, categoryName, history, sessionToken])


    const recursiveFetchQuestions = useCallback(async (number) => {

      console.log('in recursive fetch questions')
      
      let nextNumber = number - 1; 
      const response = await axios.get(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}&encode=url3986`);

      if (response.data.response_code !== 0 ) {

          if (nextNumber > 0) {

            return recursiveFetchQuestions(nextNumber);
          }

      } else {
        
        return response;

      }
    

    },[category, difficulty, sessionToken])

  const decodeText = (encodedText) => {
  
    const decodedText = decodeURIComponent(encodedText)

    return decodedText;

};

    const scrambledAnswersCallBack = useCallback(
      (questions) => {

        const questionsandAnswers = questions.reduce((acc, curr, ind) => {

          let answers = [{
            answer: decodeText(curr.correct_answer),
            correct: true
          }, {
            answer: decodeText(curr.incorrect_answers[0]),
            correct: false
          }, {
            answer: decodeText(curr.incorrect_answers[1]),
            correct: false
          }, {
            answer: decodeText(curr.incorrect_answers[2]),
            correct: false
          }];

          let mixedAnswers = [];

          let num = 4;

          for (let i = 0; i < 4; i++) {

            let randInt = Math.floor(Math.random() * num);

            num--

            mixedAnswers.push(answers[randInt]);
            answers.splice(randInt, 1)

          }

          acc.push({
            number: `Question${ind}`,
            selected: false,
            question: decodeText(curr.question),
            answers: mixedAnswers
          });
          return acc;

        }, [])

        return questionsandAnswers;

      },
      []
    )

    const getAndPrepareQuiz = useCallback (async () => {

      setIsLoading(true)

      if (sessionToken) {

        try {
          const noOfQuestions = await getNoOfQuestions();
          console.log(noOfQuestions)

          const response = await fetchQuestions(noOfQuestions);

          if (response.data && response.data.response_code === 0) {

            let questionsAndScrambledAnswers = scrambledAnswersCallBack(response.data.results);
            setQuestions(questionsAndScrambledAnswers);
            setIsLoading(false)

          } else if (response.data && response.data.response_code === 1) {

            console.log("in response code 1 if ");
            setNoResults(true);

          } else if (response.data && response.data.response_code === 2) {

            console.log("in response code 2 else if");
            setNoResults(true);

          } else if (response.data && response.data.response_code === 3) {

            console.log("in response code 3 else if ");
            getSessionToken();

          } else if (response.data && response.data.response_code === 4) {

            console.log("in response code 4 else if ");
            const resetTokenResponse = await updateSessionToken();

            if (resetTokenResponse === 0) {

              try {

                  const noOfQuestions = await getNoOfQuestions();

                  const response = await recursiveFetchQuestions(noOfQuestions);

                  let questionsAndScrambledAnswers = scrambledAnswersCallBack(response.data.results);
                  setQuestions(questionsAndScrambledAnswers);
                  setTokenChanged(tokenChanged => !tokenChanged)
                  setIsLoading(false)

              } catch (error){
                console.log(error)
                setNoResults(true);
              }

            } else {
              setNoResults(true);
            }


          }

        } catch (error) {
          console.log(error)
          setNoResults(true);

        }

      } else {
        getSessionToken();
      }

    }, [fetchQuestions, getNoOfQuestions, getSessionToken, recursiveFetchQuestions, scrambledAnswersCallBack, sessionToken, updateSessionToken])

    const getTimeTaken = useCallback((time) => {

      setTimeTaken(time);
    }, [])

    const onRadioChange = (answerInd, questionInd, event) => {

      let correctOrIncorrect = questions[questionInd].answers[answerInd].correct;
      const answersPlaceholder = [...answers]
      answersPlaceholder.splice(questionInd, 1, correctOrIncorrect);

      const questionsPlaceholder = [...questions];
      questionsPlaceholder[questionInd].selected = true;

      setQuestions(questionsPlaceholder);
      setAnswers(answersPlaceholder);
    }

    const checkAllAnswered = (array) => {

      const allChecked = array.reduce((acc, curr, ind, arr) => {

         return curr.selected ? acc + 1 : acc;

      }, 0)

      return allChecked < array.length ? false : true

    }

    const formHandler = async (event) => {
      console.log('in form handler')
      console.log(questions)

      event.preventDefault();

      const allAnswered = checkAllAnswered(questions);
      console.log(allAnswered)

      if (!allAnswered) {

          if (!showPopup)  setShowPopup(true);
      
        } else {

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
  }

    useEffect(() => {
      checkIfLoggedIn()
      getAndPrepareQuiz()

    }, [checkIfLoggedIn, getAndPrepareQuiz])

      if (noResults) {
        return <Redirect to = "/error" / >
      } 
  return (
    <div className="page" id="quiz" >
      <div id="quiz-top" >
        <h1 id="quiz-head" >Quiz Page</h1>
        {isLoading ? <p>...loading</p> : 
        <div>
          <div id="quiz-info" >
            <h2>Category: {categoryName} </h2>
            <h2>Difficulty: {difficulty}</h2>  
          </div>
          
          <div id="time-container" >
            <label>Timer:</label>
            <h4><Timer getTimeTaken={getTimeTaken}/></h4>
          </div>
        </div>
        }
      </div>
      <div id="quiz-body" >
        <form onSubmit={formHandler}>
          <div id="question-box">
            {questions.map((question, questionInd) => {
              return (
                <div id="question" key={questionInd} >
                  <h4> {question.question} </h4>
                  {question.answers.map((answer, answerInd) => {
                    return(
                      <div id="answers" key={answerInd}>
                        <input type="radio" name={question.number} value={answer.correct} onChange={(event) => onRadioChange(answerInd, questionInd, event)}/>
                        <label htmlFor={question.number}>{answer.answer}</label>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          {showPopup ? <Popup /> : null}
          <input id="quiz-submit" type="submit" value="Submit" />
        </form>    
        </div>        
    </div>
  )
}

export default Quiz
