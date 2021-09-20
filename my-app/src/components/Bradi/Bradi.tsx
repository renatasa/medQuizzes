import { questionare } from "./Questionare.js";
import QuestionsAndResult from "../QuestionsAndResult/QuestionsAndResult";

export const bradi = () => {
  const QuestionResultProps = {
    questionare: questionare
  }

  return (
    <div>
      <QuestionsAndResult {...QuestionResultProps} />
    </div>
  );
};

export default bradi;
