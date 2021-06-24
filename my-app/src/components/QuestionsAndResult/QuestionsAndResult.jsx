import React, { Component } from "react";
import SingleQuestion from "../SingleQuestion/SingleQuestion";
import "./QuestionsAndResult.scss";
import TestFinished from "../TestFinished/TestFinished";
import { answerColors } from "../../service/constants";

export class QuestionsAndResult extends Component {
  state = {
    questionsAndSelectedAnswers: [
      {
        currentQuestion: 0,
        selectedAnswersColor: [],
      },
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
    updatedObj[0].selectedAnswersColor = this.props.questionare[0].answers.map(
      (answer) => answerColors.neutral
    );

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  }

  toggleResults = () => {
    this.setState({ showResults: true });
  };

  finishTestCalculateResults = () => {
    //cheking correct and wrong answers for previous question
    if (
      this.state.currentQuestionNumber ===
      this.props.questionare.length - 1
    ) {
      //    let correctAnswers=[];
      let actuallyCorrectAnswers = []; // - array of actually correct and incorrect answers for single question
      let answersUserChose = []; // - array of answers that user chose as correct and incorrect for single question
      let checkedAnswers = []; // - checked answers array is created after comparison of actuallyCorrectAnswers and answersUserChose for single question
      let checkedQuestionsUser = []; // - checked answers array is created after comparison of actuallyCorrectAnswers and answersUserChose for all questions
      let checkedQuestions = []; //- actually correct answers for all questions
      let userScore = []; // score user made for single question
      let maxScore = []; // maximum score, if all chosen answers for single question are correct
      let finalQuestionScore = [];

      //loops through questions
      for (let z = 0; z < this.props.questionare.length; z++) {
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

          answersUserChose =
            this.state.questionsAndSelectedAnswers[z].selectedAnswersColor;

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
        }

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
    // checks if test is not finished
    let answerBackgroundColors = [];
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

      this.setState({
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        questionsAndSelectedAnswers: [
          ...this.state.questionsAndSelectedAnswers,
          {
            currentQuestion: this.state.currentQuestionNumber + 1,

            selectedAnswersColor: answerBackgroundColors,
          },
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

    updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[
      newAnswer
    ] === answerColors.neutral
      ? (updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[
          newAnswer
        ] = answerColors.correct)
      : (updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[
          newAnswer
        ] = answerColors.neutral);

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  };

  showQuestionOrResult = () => {
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
              ].selectedAnswersColor
            }
          />
        </div>
      );
    } else {
    }
  };

  generateResults = () => {
    let correctAnswers = [];
    let checkedAnswers = [];
    if (this.state.currentQuestionNumber >= this.props.questionare.length) {
      for (let i = 0; i < this.props.questionare.length; i++) {
        checkedAnswers[i] = (
          <div>
            <SingleQuestion
              checkedAnswers={this.state.checkedAnswers[i]}
              currentQuestion={this.props.questionare[i]}
              key={i}
            />
          </div>
        );

        correctAnswers[i] = (
          <div>
            <SingleQuestion
              checkedAnswers={this.state.correctAnswers[i]}
              currentQuestion={this.props.questionare[i]}
              key={i}
            />
          </div>
        );
      }
    }
    if (
      this.state.currentQuestionNumber >= this.props.questionare.length &&
      this.state.showResults
    ) {
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
              <div className="questionareBox">{checkedAnswers} </div>
            </div>

            <div>
              {this.state.checkedAnswers.length ? (
                <div className="questions">Correct answers</div>
              ) : null}
              <div className="questionareBox">{correctAnswers} </div>
            </div>
          </div>
        </div>
      );
    }
    if (
      this.state.currentQuestionNumber >= this.props.questionare.length &&
      !this.state.showResults
    ) {
      return <TestFinished toggleResults={this.toggleResults} />;
    }
  };

  render() {
    console.log(this.state.questionsAndSelectedAnswers);
    return (
      <div>
        <div className="questionareBox">{this.showQuestionOrResult()}</div>
        {this.generateResults()}
      </div>
    );
  }
}

export default QuestionsAndResult;
