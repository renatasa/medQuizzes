import React from 'react';
import './SingleQuestion.scss';
import AVNRT from '../../assets/img/AVNRT.png'

export const singleQuestion=(props)=>{
    //k - answers array, if user selects answer - its background becomes green, if user deselects answer, its background becomes grey again
    let k=[];

        let z=null;
        let answers=null;
        if(!props.checkedAnswers){

            for (let i=0; i<props.currentQuestion.answers.length; i++){
                k.push(<div class={props.selectedAnswersColor[i] ? "answerCorrect" : "answerNotSelected"} key={i} onClick={()=>props.answerClicked(i)} >{props.currentQuestion.answers[i]}</div>);
            }

        answers=<div>
                    {k}
                    <div class="arrow right" onClick={props.nextClicked}></div>
                </div>

        } else {
            let answersArr=[];
            
            for (let i=0; i<props.currentQuestion.answers.length; i++){
                console.log('current question from single question ', props.currentQuestion.answers[i]);
                if(props.checkedAnswers[i]===true){
                    z="answerCorrect";
                }else if(props.checkedAnswers[i]===false){
                    z="answerWrong";
                }else if(props.checkedAnswers[i]===null){
                    z="answerNeutral"
                }

                answersArr[i]=<div class={z} key={i} >{props.currentQuestion.answers[i]}</div>

            }
            answers=answersArr;
        }

        return (
            <div class="questionBox">
                <div class="questionImg">{props.currentQuestion.img ? <img class="image" src={AVNRT} alt={props.currentQuestion.img}/> : null}</div>
                <div class="questionText">{props.currentQuestion.question}</div>
                <div>{answers}</div>
                
            </div>
        )
    
}

export default singleQuestion
