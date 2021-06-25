import { answerColors } from "../../service/constants";

interface questions {
  [index: number]: { currentQuestion: number; selectedAnswersColor: string[] };
}

export const changeBackgroundColor = (
  questionsAndSelectedAnswers: questions,
  currentQuestionNumber: number,
  newAnswer: number
): questions => {
  console.log("service file ");
  let updatedObj: questions = JSON.parse(
    JSON.stringify(questionsAndSelectedAnswers)
  );

  updatedObj[currentQuestionNumber].selectedAnswersColor[
    newAnswer
  ] === answerColors.neutral
    ? (updatedObj[currentQuestionNumber].selectedAnswersColor[
        newAnswer
      ] = answerColors.correct)
    : (updatedObj[currentQuestionNumber].selectedAnswersColor[
        newAnswer
      ] = answerColors.neutral);

    return updatedObj
};
