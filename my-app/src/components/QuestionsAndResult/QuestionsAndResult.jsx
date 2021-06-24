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
        selectedAnswers: [],
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
      (answer) => "white"
    );

    this.setState({ questionsAndSelectedAnswers: updatedObj });
  }

  toggleResults = () => {
    this.setState({ showResults: true });
  };

  finishTestCalculateResults = () => {
    //cheking correct and wrong answers for previous question
    if (this.state.currentQuestionNumber == this.props.questionare.length - 1) {
      //    let correctAnswers=[];
      let a = [];
      let b = [];
      let c = [];
      let d = [];
      let e = [];
      let countScore = [];
      //maximum score, if all chosen answers are correct
      let maxCountScore = [];
      let finalQuestionScore = [];

      //loops through questions
      for (let z = 0; z < this.props.questionare.length; z++) {
        //a[] - array of correct answers
        a = [];
        //b[] - array of answers that user has chosen as correct
        b = [];
        //c[] - checked answers array is created after comparison of array a and array b
        c = [];
        maxCountScore[z] = 0;
        //loops through question answers, checks which answers of a question are correct by comparing with questionare's correct answers
        for (let y = 0; y < this.props.questionare[z].answers.length; y++) {
          a[y] = "white";
          // b[y] = null;

          for (
            let i = 0;
            i < this.props.questionare[z].correctAnswer.length;
            i++
          ) {
            if (y == this.props.questionare[z].correctAnswer[i]) {
              a[y] = "green";
              maxCountScore[z] = maxCountScore[z] + 1;
            }
          }

          b = this.state.questionsAndSelectedAnswers[z].selectedAnswersColor;
          console.log("b ", b);

          //compares correct answers with answers that user has selected as correct
          // true &  true = true  -  correct answer which user selected  -> displays green at the end of the test
          // ture & null = false  -  correct answer which user didn't select  -> displays red at the end of the test
          // null & true = false  -  wrong answer which user selected  -> displays red at the end of the test
          // null & null = wrong answer which user didn't select -> displays non colorised at the end of the test
          countScore[z] = 0;
          for (let i = 0; i < this.props.questionare[z].answers.length; i++) {
            if (a[i] == "green" && b[i] == "green") {
              c[i] = "green";
              countScore[z] = countScore[z] + 1;
            } else if (
              (a[i] == "green" && b[i] == "white") ||
              (a[i] == "white" && b[i] == "green")
            ) {
              c[i] = "red";
              countScore[z] = countScore[z] - 1;
            } else if (a[i] == "white" && b[i] == "white") {
              c[i] = "white";
            }
          }

          if (countScore[z] < 0) {
            countScore[z] = 0;
          }
          finalQuestionScore[z] = countScore[z] / maxCountScore[z];
        }

        //pushes correct and incorrect answers  to correct answers array
        e.push(a);
        //pushes correct correct wrong and non selected answers to checked answers [user selected answers] array
        d.push(c);
      }

      this.setState({
        checkedAnswers: d,
        correctAnswers: e,
        score: finalQuestionScore,
      });
    }
  };

  moveToNextQuestion = () => {
    // checks if test is not finished
    let x = [];
    if (this.state.currentQuestionNumber < this.props.questionare.length) {
      if (
        this.state.currentQuestionNumber <
        this.props.questionare.length - 1
      ) {
        x = this.props.questionare[
          this.state.currentQuestionNumber + 1
        ].answers.map((answer) => "white");
      }

      this.setState({
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
        questionsAndSelectedAnswers: [
          ...this.state.questionsAndSelectedAnswers,
          {
            currentQuestion: this.state.currentQuestionNumber + 1,
            selectedAnswers: [],
            selectedAnswersColor: x,
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
    ] === "white"
      ? (updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[
          newAnswer
        ] = "green")
      : (updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[
          newAnswer
        ] = "white");

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
