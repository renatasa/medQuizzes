import React, { useState, useEffect } from "react";
import SingleQuestion from "../SingleQuestion/SingleQuestion";
import "./QuestionsAndResult.scss";
import TestFinished from "../TestFinished/TestFinished";
import { answerColors } from "../../constants/constants";
import { iQuestion } from '../../types/index';

export const QuestionsAndResult = ({ questionare }) => {
  const [questionsAndSelectedAnswers, setQuestionsAndSelectedAnswers] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState([]);

  useEffect(() => {
    let updatedObj = [];
    updatedObj[0] = questionare[0].answers.map(
      (_: string) => answerColors.neutral
    );
    setQuestionsAndSelectedAnswers(updatedObj)
  }, []);

  const toggleResults = () => {
    setShowResults(true)
  };

  const calculateScores = (userScore: number, maxScore: number) => {
    if (userScore < 0) {
      userScore = 0;
    }
    return userScore / maxScore;
  }

  const checkAnswers = (
    selectedQuestion: iQuestion,
    actuallyCorrectAnswersSingleQuestion: string[],
    userAnswersSingleQuestion: string[],
    maxScoreForThisQuestion: number
  ) => {
    let checkedAnswers = []; // - checked answers array is created after comparison of actuallyCorrectAnswers and userAnswersSingleQuestion for single question
    let userScoreForThisQuestion = 0;
    // compares correct answers with answers that user has selected as correct
    // correct &  correct = correct  -  correct answer which user selected  -> displays green at the end of the test
    // correct & neutral = incorrect  -  correct answer which user didn't select  -> displays red at the end of the test
    // neutral & correct = incorrect  -  wrong answer which user selected  -> displays red at the end of the test
    // neutral & neutral = neutral - wrong answer which user didn't select -> displays non colorised at the end of the test

    selectedQuestion.answers.forEach((_: string, i: number) => {
      if (
        actuallyCorrectAnswersSingleQuestion[i] === answerColors.correct &&
        userAnswersSingleQuestion[i] === answerColors.correct
      ) {
        checkedAnswers[i] = answerColors.correct;
        userScoreForThisQuestion += 1;
      }
      if (actuallyCorrectAnswersSingleQuestion[i] === answerColors.neutral &&
        userAnswersSingleQuestion[i] === answerColors.correct
      ) {
        checkedAnswers[i] = answerColors.incorrect;
        userScoreForThisQuestion -= 1;
      }
      if (
        actuallyCorrectAnswersSingleQuestion[i] === answerColors.correct &&
        userAnswersSingleQuestion[i] === answerColors.neutral

      ) {
        checkedAnswers[i] = answerColors.neutral;
        userScoreForThisQuestion -= 1;
      }
      if (
        actuallyCorrectAnswersSingleQuestion[i] === answerColors.neutral &&
        userAnswersSingleQuestion[i] === answerColors.neutral
      ) {
        checkedAnswers[i] = answerColors.neutral;
      }

    })

    const finalScore = calculateScores(userScoreForThisQuestion, maxScoreForThisQuestion)
    return {
      checkedAnswers: checkedAnswers,
      finalQuestionScore: finalScore
    };
  };

  const loopThroughAnswers = (question: iQuestion) => {
    let actuallyCorrectAnswers = []; // - array of actually correct and incorrect answers for single question

    let maxScore = 0; // maximum score for a single question, if all chosen answers are correct

    // take single answer
    question.answers.forEach((_, answerIndex) => {
      // set answer's default color to neutral
      actuallyCorrectAnswers[answerIndex] = answerColors.neutral;

      // check if that answer is correct
      question.correctAnswer.forEach((correctAnswer) => {
        // if it is correct, set answers color from default to correct
        if (correctAnswer === answerIndex) {
          actuallyCorrectAnswers[answerIndex] = answerColors.correct;
          maxScore += 1;
        }
      });
    });

    return { actuallyCorrectAnswersSingleQuestion: actuallyCorrectAnswers, maxScoreForSingleQuestion: maxScore }

  }

  const finishTestCalculateResults = () => {
    //cheking if last question is reached by user
    if (
      currentQuestionNumber ===
      questionare.length - 1
    ) {
      let actuallyCorrectAnswers = []; // actually correct answers for all questions
      let userAnswers = []; // this array is created after comparison of actuallyCorrectAnswersSingleQuestion and userAnswersForSingleQuestion for all questions
      let finalScore = []; //  userScore / maxScore for all questions

      questionare.forEach((question: iQuestion, questionIndex: number) => {
        const { actuallyCorrectAnswersSingleQuestion, maxScoreForSingleQuestion } = loopThroughAnswers(question)
        const userAnswersForSingleQuestion = questionsAndSelectedAnswers[questionIndex]; // - array of answers that user chose as correct and incorrect for single question
        const { checkedAnswers, finalQuestionScore } = checkAnswers(
          question,
          actuallyCorrectAnswersSingleQuestion,
          userAnswersForSingleQuestion,
          maxScoreForSingleQuestion
        );

        finalScore[questionIndex] = finalQuestionScore
        actuallyCorrectAnswers.push(actuallyCorrectAnswersSingleQuestion);
        userAnswers.push(checkedAnswers);
      });

      setCheckedAnswers(userAnswers)
      setCorrectAnswers(actuallyCorrectAnswers)
      setScore(finalScore)
    }
  };

  const moveToNextQuestion = () => {
    let answerBackgroundColors = [];
    // checks if test is not finished
    if (currentQuestionNumber < questionare.length) {
      // checks if there will be another question
      if (
        currentQuestionNumber <
        questionare.length - 1
      ) {
        answerBackgroundColors = questionare[
          currentQuestionNumber + 1
        ].answers.map((_: number) => answerColors.neutral);
      }

      let updatedArr = [...questionsAndSelectedAnswers];
      updatedArr.push(answerBackgroundColors);

      setCurrentQuestionNumber(currentQuestionNumber + 1)
      setQuestionsAndSelectedAnswers(updatedArr)
    }
  };

  const nextQuestion = () => {
    // if this is last question
    finishTestCalculateResults();
    // if this is not last question
    moveToNextQuestion();
  };

  const answerClicked = (newAnswer: number) => {
    let updatedObj = [...questionsAndSelectedAnswers]
    updatedObj[currentQuestionNumber][newAnswer] ===
      answerColors.neutral
      ? (updatedObj[currentQuestionNumber][newAnswer] =
        answerColors.correct)
      : (updatedObj[currentQuestionNumber][newAnswer] =
        answerColors.neutral);
    setQuestionsAndSelectedAnswers(updatedObj)
  };

  const showQuestion = () => {
    if (currentQuestionNumber < questionare.length) {
      return (
        <div>
          <div className="questionNumber">
            {currentQuestionNumber + 1} /{" "}
            {questionare.length}
          </div>
          <SingleQuestion
            answerClicked={answerClicked}
            nextClicked={nextQuestion}
            key={currentQuestionNumber}
            currentQuestion={
              questionare[currentQuestionNumber]
            }
            selectedAnswersArr={
              questionsAndSelectedAnswers[
              currentQuestionNumber
              ]
            }
            selectedAnswersColor={
              questionsAndSelectedAnswers[
              currentQuestionNumber
              ]
            }
          />
        </div>
      );
    }
  };

  const generateResultsView = () => {
    let correctAnswersArr = [];
    let checkedAnswersArr = [];
    questionare.forEach((question: iQuestion, key: number) => {
      checkedAnswersArr[key] = (
        <div key={key}>
          <SingleQuestion
            checkedAnswers={checkedAnswers[key]}
            currentQuestion={question}
            key={key}
          />
        </div>
      );

      correctAnswersArr[key] = (
        <div key={key}>
          <SingleQuestion
            checkedAnswers={correctAnswers[key]}
            currentQuestion={question}
            key={key}
          />
        </div>
      );
    });

    return { checkedAnswers: checkedAnswersArr, correctAnswers: correctAnswersArr };
  };

  const displayResults = () => {
    if (
      currentQuestionNumber >= questionare.length &&
      showResults
    ) {
      let testResults = generateResultsView();
      return (
        <div>
          <div className="score">
            You scored{" "}
            {(
              (score.reduce((a, b) => a + b, 0) /
                score.length) *
              100
            ).toFixed(0)}
            %
          </div>
          <div className="questionare">
            <div>
              {checkedAnswers.length ? (
                <div className="questions">Your answers</div>
              ) : null}
              <div className="questionareBox">
                {testResults.checkedAnswers}{" "}
              </div>
            </div>

            <div>
              {checkedAnswers.length ? (
                <div className="questions">Correct answers</div>
              ) : null}
              <div className="questionareBox">
                {testResults.correctAnswers}{" "}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const displayTestFinishedBox = () => {
    if (
      currentQuestionNumber >= questionare.length &&
      !showResults
    ) {
      return <TestFinished toggleResults={toggleResults} />;
    }
  };


  return (
    <div>
      <div className="questionareBox">{showQuestion()}</div>
      {displayResults()}
      {displayTestFinishedBox()}
    </div>
  );
}


export default QuestionsAndResult;
