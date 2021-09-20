import "./SingleQuestion.scss";
import AVNRT from "../../assets/img/AVNRT.png";
import { iQuestion } from "../../types/index";

// answers array - if user selects answer - its background changes color (e.g. becomes green), if user deselects answer, its background changes color to previous one (e.g. white)
// in final results section - false answers that user selected as correct have red background
const answerColor = (answer: string) => {
  switch (answer) {
    case "green":
      return "answerCorrect";
    case "red":
      return "answerWrong";
    case "white":
      return "answerNeutral";
    default:
      break;
  }
};

const createAnswerArray = (answersArray: string[], colorOfAnswer: string[], answerClicked: (newAnswer: number) => void) => {
  return answersArray.map((singleAnswer, key) => (
    <div
      className={answerColor(colorOfAnswer[key])}
      key={key}
      onClick={() => answerClicked(key)}
    >
      {singleAnswer}
    </div>
  ));
};

export const singleQuestion = (props: {
  answerClicked?: (answerNumber?: number) => void, nextClicked?: () => void,
  currentQuestion: iQuestion, selectedAnswersArr?: string[], selectedAnswersColor?: string[], checkedAnswers?: string[]
}) => {
  let answers = null;
  if (!props.checkedAnswers && props.selectedAnswersArr) {
    let answersArray = createAnswerArray(
      props.currentQuestion.answers,
      props.selectedAnswersArr,
      props.answerClicked
    );

    answers = (
      <div>
        {answersArray}
        <div className="arrow right" onClick={props.nextClicked}></div>
      </div>
    );
  }

  if (props.checkedAnswers) {
    let answersArr = createAnswerArray(
      props.currentQuestion.answers,
      props.checkedAnswers,
      () => { }
    );

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
