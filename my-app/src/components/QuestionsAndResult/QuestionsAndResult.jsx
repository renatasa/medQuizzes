import React, { Component } from "react";
import SingleQuestion from "../SingleQuestion/SingleQuestion";
import "./QuestionsAndResult.scss";
import TestFinished from "../TestFinished/TestFinished";
import { changeBackgroundColor } from "./service";
import { answerColors } from "../../service/constants";

export class QuestionsAndResult extends Component {
  state = {
    // questionsAndSelectedAnswers: [
    //   {
    //     currentQuestion: 0,
    //     selectedAnswersColor: [],
    //   },
    // ],
    questionsAndSelectedAnswers: [
     
    ],
    currentQuestionNumber: 0,
    checkedAnswers: [],
    correctAnswers: [],
    showResults: false,
    score: [],
  };

  componentDidMount() {
    let updatedObj = JSON.parse(
      JSON.stringify(this.state.questionsAndSelectedAnswers)
    );
    updatedObj[0]= this.props.questionare[0].answers.map(
      (answer) => answerColors.neutral
    );

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  }

  toggleResults = () => {
    this.setState({ showResults: true });
  };

  finishTestCalculateResults = () => {
    //cheking if last question is reached by user
    if (
      this.state.currentQuestionNumber ===
      this.props.questionare.length - 1
    ) {
      let checkedQuestions = []; //- actually correct answers for all questions
      let checkedQuestionsUser = []; // - checked answers array is created after comparison of actuallyCorrectAnswers and answersUserChose for all questions
      let userScore = []; // array of scores user gained for each of questions
      let maxScore = []; // array of maximum scores, if all chosen answers for each question are correct
      let finalQuestionScore = []; // userScore / maxScore for a single question

      //loops through questions
      for (let z = 0; z < this.props.questionare.length; z++) {
        let actuallyCorrectAnswers = []; // - array of actually correct and incorrect answers for single question
        let answersUserChose = []; // - array of answers that user chose as correct and incorrect for single question
        let checkedAnswers = []; // - checked answers array is created after comparison of actuallyCorrectAnswers and answersUserChose for single question

        maxScore[z] = 0;
        //loops through question answers, checks which answers of a question are correct by comparing with questionare's correct answers
        for (let y = 0; y < this.props.questionare[z].answers.length; y++) {
          actuallyCorrectAnswers[y] = answerColors.neutral;

          for (
            let i = 0;
            i < this.props.questionare[z].correctAnswer.length;
            i++
          ) {
            if (y === this.props.questionare[z].correctAnswer[i]) {
              actuallyCorrectAnswers[y] = answerColors.correct;
              maxScore[z] = maxScore[z] + 1;
            }
          }
        }

        answersUserChose =
          this.state.questionsAndSelectedAnswers[z];
        // compares correct answers with answers that user has selected as correct
        // correct &  correct = currect  -  correct answer which user selected  -> displays green at the end of the test
        // correct & neutral = incorrect  -  correct answer which user didn't select  -> displays red at the end of the test
        // nuutral & correct = incorrect  -  wrong answer which user selected  -> displays red at the end of the test
        // neutraul & neutral = neutral - wrong answer which user didn't select -> displays non colorised at the end of the test
        userScore[z] = 0;
        for (let i = 0; i < this.props.questionare[z].answers.length; i++) {
          if (
            actuallyCorrectAnswers[i] === answerColors.correct &&
            answersUserChose[i] === answerColors.correct
          ) {
            checkedAnswers[i] = answerColors.correct;
            userScore[z] = userScore[z] + 1;
          } else if (
            (actuallyCorrectAnswers[i] === answerColors.correct &&
              answersUserChose[i] === answerColors.neutral) ||
            (actuallyCorrectAnswers[i] === answerColors.neutral &&
              answersUserChose[i] === answerColors.correct)
          ) {
            checkedAnswers[i] = answerColors.incorrect;
            userScore[z] = userScore[z] - 1;
          } else if (
            actuallyCorrectAnswers[i] === answerColors.neutral &&
            answersUserChose[i] === answerColors.neutral
          ) {
            checkedAnswers[i] = answerColors.neutral;
          }
        }

        if (userScore[z] < 0) {
          userScore[z] = 0;
        }
        finalQuestionScore[z] = userScore[z] / maxScore[z];

        //pushes correct and incorrect answers  to correct answers array
        checkedQuestions.push(actuallyCorrectAnswers);
        //pushes correct correct wrong and non selected answers to checked answers [user selected answers] array
        checkedQuestionsUser.push(checkedAnswers);
      }

      this.setState({
        checkedAnswers: checkedQuestionsUser,
        correctAnswers: checkedQuestions,
        score: finalQuestionScore,
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
        ].answers.map((answer) => answerColors.neutral);
      }

      let updatedArr=[...this.state.questionsAndSelectedAnswers];
      updatedArr.push(answerBackgroundColors)

      this.setState({
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        questionsAndSelectedAnswers: [
          ...updatedArr
        ],
      });
    }
  };

  nextQuestion = () => {
    // if this is last question
    this.finishTestCalculateResults();
    // if this is not last question
    this.moveToNextQuestion();
  };

  answerClicked = (newAnswer) => {
    let updatedObj = JSON.parse(
      JSON.stringify(this.state.questionsAndSelectedAnswers)
    );

    updatedObj[this.state.currentQuestionNumber][
      newAnswer
    ] === answerColors.neutral
      ? (updatedObj[this.state.currentQuestionNumber][
          newAnswer
        ] = answerColors.correct)
      : (updatedObj[this.state.currentQuestionNumber][
          newAnswer
        ] = answerColors.neutral);
    // changeBackgroundColor(
    //   this.state.questionsAndSelectedAnswers,
    //   this.state.currentQuestionNumber
    // );
    // let updatedObj = changeBackgroundColor(
    //   this.state.questionsAndSelectedAnswers,
    //   this.state.currentQuestionNumber,
    //   newAnswer
    // );

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  };

  showQuestion = () => {
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
    this.props.questionare.map((question, key) => {
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
