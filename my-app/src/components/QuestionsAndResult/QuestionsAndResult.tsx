import React from "react";
import SingleQuestion from "../SingleQuestion/SingleQuestion";
import "./QuestionsAndResult.scss";
import TestFinished from "../TestFinished/TestFinished";
import { answerColors } from "../../constants/constants";
import { iQuestion } from '../../types/index';

type MyProps = { questionare: iQuestion[] };
type MyState = {
  questionsAndSelectedAnswers: [][],
  currentQuestionNumber: number,
  checkedAnswers: [][],
  correctAnswers: [][],
  showResults: boolean,
  score: number[]
};

export class QuestionsAndResult extends React.Component<MyProps, MyState>  {
  state = {
    questionsAndSelectedAnswers: [],
    currentQuestionNumber: 0,
    checkedAnswers: [],
    correctAnswers: [],
    showResults: false,
    score: [],
  };

  componentDidMount() {
    let updatedObj = [];
    updatedObj[0] = this.props.questionare[0].answers.map(
      (_) => answerColors.neutral
    );

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  }

  toggleResults = () => {
    this.setState({ showResults: true });
  };

  calculateScores = (userScore: number, maxScore: number) => {
    if (userScore < 0) {
      userScore = 0;
    }
    return userScore / maxScore;
  }

  checkAnswers = (
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

    const finalScore = this.calculateScores(userScoreForThisQuestion, maxScoreForThisQuestion)
    return {
      checkedAnswers: checkedAnswers,
      finalQuestionScore: finalScore
    };
  };

  loopThroughAnswers = (question: iQuestion) => {
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

  finishTestCalculateResults = () => {
    //cheking if last question is reached by user
    if (
      this.state.currentQuestionNumber ===
      this.props.questionare.length - 1
    ) {
      let actuallyCorrectAnswers = []; // actually correct answers for all questions
      let userAnswers = []; // this array is created after comparison of actuallyCorrectAnswersSingleQuestion and userAnswersForSingleQuestion for all questions
      let finalScore = []; //  userScore / maxScore for all questions

      this.props.questionare.forEach((question, questionIndex) => {
        const { actuallyCorrectAnswersSingleQuestion, maxScoreForSingleQuestion } = this.loopThroughAnswers(question)
        const userAnswersForSingleQuestion = this.state.questionsAndSelectedAnswers[questionIndex]; // - array of answers that user chose as correct and incorrect for single question
        const { checkedAnswers, finalQuestionScore } = this.checkAnswers(
          question,
          actuallyCorrectAnswersSingleQuestion,
          userAnswersForSingleQuestion,
          maxScoreForSingleQuestion
        );

        finalScore[questionIndex] = finalQuestionScore
        actuallyCorrectAnswers.push(actuallyCorrectAnswersSingleQuestion);
        userAnswers.push(checkedAnswers);
      });

      this.setState({
        checkedAnswers: userAnswers,
        correctAnswers: actuallyCorrectAnswers,
        score: finalScore,
      });
    }
  };

  moveToNextQuestion = () => {
    let answerBackgroundColors = [];
    // checks if test is not finished
    if (this.state.currentQuestionNumber < this.props.questionare.length) {
      // checks if there will be another question
      if (
        this.state.currentQuestionNumber <
        this.props.questionare.length - 1
      ) {
        answerBackgroundColors = this.props.questionare[
          this.state.currentQuestionNumber + 1
        ].answers.map((_) => answerColors.neutral);
      }

      let updatedArr = [...this.state.questionsAndSelectedAnswers];
      updatedArr.push(answerBackgroundColors);

      this.setState({
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        questionsAndSelectedAnswers: [...updatedArr],
      });
    }
  };

  nextQuestion = () => {
    // if this is last question
    this.finishTestCalculateResults();
    // if this is not last question
    this.moveToNextQuestion();
  };

  answerClicked = (newAnswer: number) => {
    let updatedObj = [...this.state.questionsAndSelectedAnswers]
    updatedObj[this.state.currentQuestionNumber][newAnswer] ===
      answerColors.neutral
      ? (updatedObj[this.state.currentQuestionNumber][newAnswer] =
        answerColors.correct)
      : (updatedObj[this.state.currentQuestionNumber][newAnswer] =
        answerColors.neutral);
    this.setState({ questionsAndSelectedAnswers: updatedObj });
  };

  showQuestion = () => {
    console.log('arr ', this.state.questionsAndSelectedAnswers[
      this.state.currentQuestionNumber
    ])
    if (this.state.currentQuestionNumber < this.props.questionare.length) {
      return (
        <div>
          <div className="questionNumber">
            {this.state.currentQuestionNumber + 1} /{" "}
            {this.props.questionare.length}
          </div>
          <SingleQuestion
            answerClicked={this.answerClicked}
            nextClicked={this.nextQuestion}
            key={this.state.currentQuestionNumber}
            currentQuestion={
              this.props.questionare[this.state.currentQuestionNumber]
            }
            selectedAnswersArr={
              this.state.questionsAndSelectedAnswers[
              this.state.currentQuestionNumber
              ]
            }
            selectedAnswersColor={
              this.state.questionsAndSelectedAnswers[
              this.state.currentQuestionNumber
              ]
            }
          />
        </div>
      );
    }
  };

  generateResultsView = () => {
    let correctAnswers = [];
    let checkedAnswers = [];
    this.props.questionare.forEach((question, key) => {
      checkedAnswers[key] = (
        <div key={key}>
          <SingleQuestion
            checkedAnswers={this.state.checkedAnswers[key]}
            currentQuestion={question}
            key={key}
          />
        </div>
      );

      correctAnswers[key] = (
        <div key={key}>
          <SingleQuestion
            checkedAnswers={this.state.correctAnswers[key]}
            currentQuestion={question}
            key={key}
          />
        </div>
      );
    });

    return { checkedAnswers: checkedAnswers, correctAnswers: correctAnswers };
  };

  displayResults = () => {
    if (
      this.state.currentQuestionNumber >= this.props.questionare.length &&
      this.state.showResults
    ) {
      let testResults = this.generateResultsView();
      return (
        <div>
          <div className="score">
            You scored{" "}
            {(
              (this.state.score.reduce((a, b) => a + b, 0) /
                this.state.score.length) *
              100
            ).toFixed(0)}
            %
          </div>
          <div className="questionare">
            <div>
              {this.state.checkedAnswers.length ? (
                <div className="questions">Your answers</div>
              ) : null}
              <div className="questionareBox">
                {testResults.checkedAnswers}{" "}
              </div>
            </div>

            <div>
              {this.state.checkedAnswers.length ? (
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

  displayTestFinishedBox = () => {
    if (
      this.state.currentQuestionNumber >= this.props.questionare.length &&
      !this.state.showResults
    ) {
      return <TestFinished toggleResults={this.toggleResults} />;
    }
  };

  render() {
    return (
      <div>
        <div className="questionareBox">{this.showQuestion()}</div>
        {this.displayResults()}
        {this.displayTestFinishedBox()}
      </div>
    );
  }
}

export default QuestionsAndResult;
