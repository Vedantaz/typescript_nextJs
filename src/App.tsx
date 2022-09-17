import React, { useState } from 'react';
import './App.css';
// import the components 
import QuestionCard from './components/QuestionCard';
// importing the functions to fetch data from API..
import fetchQuizQuestions, { QuestionState, Difficulty } from './API';

// import styles from the  global styles
import { GlobalStyle, Wrapper } from "./App.styles";

//import loader image
import Loader from "./images/loading.gif";     // to insert in process

const TotalQuestions = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;

}

const App: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumbers] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [complete, setComplete] = React.useState<boolean>(false);
  const [difficulty, setDifficulty] = React.useState<string>(Difficulty.EASY);


  const startQuiz = async () => {
    setComplete(false);
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizQuestions(
      TotalQuestions,
      Difficulty.EASY,
    )
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumbers(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // user answers
      const answer = e.currentTarget.value;

      // check answer against correct answer 
      const correct = questions[number].correct_answers === answer;
      // add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      // save answers in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answers,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }

  };
  // const handleNext = () => {
  //   if (number < TotalQuestions - 1) setNumbers((prev) => prev + 1);
  //   else setComplete(true);
  // }

  // const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setDifficulty(e.target.value);
  // }
  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TotalQuestions) {
      setGameOver(true);
    }
    else {
      setNumbers(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React - Type - Quiz</h1>
        {complete && <div className="complete">Quiz is complete</div>}
        {gameOver || userAnswers.length === TotalQuestions ? (

          <button className='start' onClick={startQuiz}>Start Quiz</button>) : null}

        {/* <p>Select Difficulty</p>
            <select value={difficulty} onChange={handleDifficulty}>
              {Object.keys(difficulty).map((key) => (
                <option value={difficulty[parseInt(key)]} key={key} >
                  {key}
                </option>
              ))}
            </select>*/}


        {!gameOver ? <p className="score"> Score : {score}</p> : null}
        {loading ? <p>Loading questions...</p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TotalQuestions}
            question={questions[number].question}
            // check the reason for question
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {/* // made data types of userAnswers.length (boolean ) and number  to boolean  */}
        {!loading && !gameOver && !!userAnswers.length === Boolean(number + 1) && number !== TotalQuestions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>)
};
export default App;