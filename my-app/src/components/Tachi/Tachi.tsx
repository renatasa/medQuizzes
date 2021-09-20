import { questionare } from "./Questionare.js";
import QuestionsAndResult from "../QuestionsAndResult/QuestionsAndResult";

export const tachi = () => {
  const QuestionResultProps = {
    questionare: questionare
  }
  return (
    <div>
      <QuestionsAndResult {...QuestionResultProps} />
    </div>
  );
};

export default tachi;
