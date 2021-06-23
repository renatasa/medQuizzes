import React from "react";
import "./SingleQuestion.scss";
import AVNRT from "../../assets/img/AVNRT.png";

export const singleQuestion = (props) => {
  // answers array - if user selects answer - its background becomes green, if user deselects answer, its background becomes grey again

  let answers = null;
  if (!props.checkedAnswers) {
    let answersArray = props.currentQuestion.answers.map(
      (singleAnswer, key) => (
        <div
          className={
            props.selectedAnswersColor[key]
              ? "answerCorrect"
              : "answerNotSelected"
          }
          key={key}
          onClick={() => props.answerClicked(key)}
        >
          {singleAnswer}
        </div>
      )
    );

    answers = (
      <div>
        {answersArray}
        <div className="arrow right" onClick={props.nextClicked}></div>
      </div>
    );
  } else {
    let answerColor = (i) => {
      if (props.checkedAnswers[i] === true) {
        return "answerCorrect";
      } else if (props.checkedAnswers[i] === false) {
        return "answerWrong";
      } else if (props.checkedAnswers[i] === null) {
        return "answerNeutral";
      }
    };

    let answersArr = props.currentQuestion.answers.map((singleAnswer, key) => (
      <div className={answerColor(key)} key={key}>
        {singleAnswer}
      </div>
    ));

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
