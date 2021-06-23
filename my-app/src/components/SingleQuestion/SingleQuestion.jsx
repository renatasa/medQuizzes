import React from "react";
import "./SingleQuestion.scss";
import AVNRT from "../../assets/img/AVNRT.png";

export const singleQuestion = (props) => {
  //k - answers array, if user selects answer - its background becomes green, if user deselects answer, its background becomes grey again
  let k = [];

  let z = null;
  let answers = null;
  if (!props.checkedAnswers) {
    for (let i = 0; i < props.currentQuestion.answers.length; i++) {
      k.push(
        <div
          className={
            props.selectedAnswersColor[i]
              ? "answerCorrect"
              : "answerNotSelected"
          }
          key={i}
          onClick={() => props.answerClicked(i)}
        >
          {props.currentQuestion.answers[i]}
        </div>
      );
    }

    answers = (
      <div>
        {k}
        <div className="arrow right" onClick={props.nextClicked}></div>
      </div>
    );
  } else {
    let answersArr = [];

    for (let i = 0; i < props.currentQuestion.answers.length; i++) {
      if (props.checkedAnswers[i] === true) {
        z = "answerCorrect";
      } else if (props.checkedAnswers[i] === false) {
        z = "answerWrong";
      } else if (props.checkedAnswers[i] === null) {
        z = "answerNeutral";
      }

      answersArr[i] = (
        <div className={z} key={i}>
          {props.currentQuestion.answers[i]}
        </div>
      );
    }
    answers = answersArr;
  }

  return (
    <div className="questionBox">
      <div className="questionImg">
        {props.currentQuestion.img ? (
          <img className="image" src={AVNRT} alt={props.currentQuestion.img} />
        ) : null}
      </div>
      <div className="questionText">{props.currentQuestion.question}</div>
      <div>{answers}</div>
    </div>
  );
};

export default singleQuestion;
