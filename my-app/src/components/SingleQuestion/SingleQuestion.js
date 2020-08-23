import React from 'react' ;
import './SingleQuestion.scss';

export const singleQuestion=(props)=>{
console.log('single qustion ', props.currentQuestion);
        // let testQuestion= {
        //     question: "What is focal atrial tachycardia?",
        //     answers: ["Focal AT is defined as an organized atrial rhythm >_100 b.p.m. initiated from a discrete origin and spreading over both atria in a centrifugal pattern",
        //     "Focal AT is defined as an organized atrial rhythm >_100 b.p.m. initiated from a sinus node and spreading over both atria in a centrifugal pattern", 
        //     "Focal AT is defined as an organized atrial rhythm >_100 b.p.m. initiated from a discrete origin and spreading over both atria via AV node to ventricles", 
        //     "Focal AT is defined as an organized atrial rhythm >_100 b.p.m. initiated from a multiply origins in atria and spreading to ventricles via AV node"],
        //     correctAnswer: [0]
        // }

        let answers= props.currentQuestion.answers.map(answer=><div class="answer">{answer}</div>)

        return (
            <div class="questionBox">
                <div class="question">{props.currentQuestion.question}</div>
                <div>{answers}</div>
                <div class="arrow right" onClick={props.clicked}></div>
            </div>
        )
    
}

export default singleQuestion
