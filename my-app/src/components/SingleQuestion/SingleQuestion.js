import React from 'react' ;
import './SingleQuestion.scss';

export const singleQuestion=(props)=>{

        console.log('single question ', Object.keys(props.currentQuestion.answers));
        //z var determines checked answers color
        let z=null;

        let answers=null;
        if(!props.checkedAnswers){
             answers= props.currentQuestion.answers.map((answer, index)=><div class={"answerNotSelected"} key={index} onClick={()=>props.answerClicked(index)} >{answer}</div>)
        } else {
            let answersArr=[];
            
            for (let i=0; i<props.currentQuestion.answers.length; i++){
                console.log('current question from single question ', props.currentQuestion.answers[i]);
                if(props.checkedAnswers[i]===true){
                    z="answerCorrect";
                }else if(props.checkedAnswers[i]===false){
                    z="answerWrong";
                }else if(props.checkedAnswers[i]===null){
                    z="answerNotSelected"
                }

                answersArr[i]=<div class={z} key={i} >{props.currentQuestion.answers[i]}</div>

            }
            answers=answersArr;
        }

       

        return (
            <div class="questionBox">
                <div class="question">{props.currentQuestion.question}</div>
                <div>{answers}</div>
                <div class="arrow right" onClick={props.nextClicked}></div>
            </div>
        )
    
}

export default singleQuestion
