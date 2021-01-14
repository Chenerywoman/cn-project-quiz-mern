// const receivedQuestions = [{
//     category: "Entertainment: Books",
//     correct_answer: "1984",
//     difficulty: "easy",
//     incorrect_answers: ["The Old Man and the Sea", "Catcher and the Rye", "To Kill a Mockingbird"],
//     question: "George Orwell wrote this book, which is often considered a statement on government oversight.",
//     type: "multiple"
// }, {
//     category: "Entertainment: Books",
//     correct_answer: "Frankenstein",
//     difficulty: "easy",
//     incorrect_answers: ["Dracula", "The Strange Case of Dr. Jekyll and Mr. Hyde ", "The Legend of Sleepy Hollow"],
//     question: "Which famous book is sub-titled &#039;The Modern Prometheus&#039;?",
//     type: "multiple"
// }, {
//     category: "Entertainment: Books",
//     correct_answer: "Dr. Seuss",
//     difficulty: "easy",
//     incorrect_answers: ["Beatrix Potter", "Roald Dahl", "A.A. Milne"],
//     question: "&quot;Green Eggs And Ham&quot; is a book by which author?",
//     type: "multiple",
// }]

// const getQuestionsAndAnswers = (questions) => {

//     const retrievedQuestionsAndAnswers= questions.reduce((acc, curr, ind, arr) => {
      
//        acc.push({question: curr.question, answers: [{answer: curr.correct_answer, correct: true}, {answer: curr.incorrect_answers[0], correct:false}, {answer: curr.incorrect_answers[1], correct:false}, {answer: curr.incorrect_answers[2], correct:false}]});
//        return acc;

//     }, [])

//     console.log(retrievedQuestionsAndAnswers[0].question)
//     console.log(retrievedQuestionsAndAnswers[0].answers[0].answer)
// };

// getQuestionsAndAnswers(receivedQuestions);

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

const helpers = {
    scrambleAnswers
}

export default helpers;

// console.log(scrambleAnswers(receivedQuestions))
// console.log(scrambleAnswers(receivedQuestions)[1].answers)
// console.log(scrambleAnswers(receivedQuestions)[2].answers)




