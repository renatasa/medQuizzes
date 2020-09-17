import React from 'react' ;
import './SingleQuestion.scss';

export const singleQuestion=(props)=>{

        let x=10;

        console.log('single question ', Object.keys(props.currentQuestion.answers));

        let answers= props.currentQuestion.answers.map((answer, index)=><div class="answerNotSelected" key={index} onClick={()=>props.answerClicked(index)} >{answer}</div>)

        return (
            <div class="questionBox">
                <div class="question">{props.currentQuestion.question}</div>
                <div>{answers}</div>
                <div class="arrow right" onClick={props.nextClicked}></div>
            </div>
        )
    
}

export default singleQuestion
