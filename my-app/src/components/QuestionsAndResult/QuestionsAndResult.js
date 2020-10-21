import React, { Component } from 'react';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import './QuestionsAndResult.scss';

export class QuestionsAndResult extends Component {
    state={
         questionsAndSelectedAnswers: [
            {
                currentQuestion: 0,
                selectedAnswers: [], 
                selectedAnswersColor: [false, false, false, false, false, false]
            }
         ],
         currentQuestionNumber: 0, 
         checkedAnswers: [],
         correctAnswers: []
    }

    nextQuestion=()=>{
        console.log('next clicked');

        //cheking correct and wrong answers for previous question
        if (this.state.currentQuestionNumber==this.props.questionare.length-1){
            console.log('checking answers');
        //    let correctAnswers=[];
            let a=[];
            let b=[];
            let c=[];
            let d=[];
            let e=[];


            for(let z=0; z<this.props.questionare.length; z++){
                //a[] - array of correct answers
                a=[];
                //b[] - array of answers that user has chosen as correct
                b=[];
                //c[] - checked answers array is created after comparison of array a and array b
                c=[];
               
                //checks which answers of a question are correct by comparing with questionare's correct answers
                for(let y=0; y<this.props.questionare[z].answers.length; y++){
                    a[y]=null;
                    b[y]=null;
                    console.log('a ',a);
                    console.log('b ',b);
                    for(let i=0; i<this.props.questionare[z].correctAnswer.length; i++){
                        if(y ==this.props.questionare[z].correctAnswer[i]){
                            a[y]=true;
                        }
                    }

                    //checks which answers of a question user has chosen as correct
                    for(let i=0; i<this.state.questionsAndSelectedAnswers[z].selectedAnswers.length; i++){
                        if(y==this.state.questionsAndSelectedAnswers[z].selectedAnswers[i]){
                            b[y]=true;
                        }
                    }

                    //compares correct answers with answers that user has selected as correct
                    // true &  true = true  -  correct answer which user selected  -> displays green at the end of the test
                    // ture & null = false  -  correct answer which user didn't select  -> displays red at the end of the test
                    // null & true = false  -  wrong answer which user selected  -> displays red at the end of the test
                    // null & null = wrong answer which user didn't select -> displays non colorised at the end of the test
                    for(let i=0; i<this.props.questionare[z].answers.length; i++){
                        if(a[i]==true && b[i]==true){
                            c[i]=true;
                        }else if( (a[i]==true &&  b[i]==null)  || (a[i]==null && b[i]==true) ){
                            c[i]=false;
                        }else if(a[i]==null  &&  b[i]==null){
                            c[i]=null
                        }

                    }
                    
                   
                }

                //pushes correct and incorrect answers  to correct answers array
                e.push(a);
                //pushes correct correct wrong and non selected answers to checked answers [user selected answers] array
                d.push(c);
            }
            
            this.setState({checkedAnswers : d, correctAnswers:e})

                console.log('c from nex question answer checking ', c);
                console.log('d from nex question answer checking ', d);

        }
    
    if (this.state.currentQuestionNumber<this.props.questionare.length){
      let x=[];
      for (let i=0; i<this.props.questionare[this.state.currentQuestionNumber+1].answers.length; i++){
          x.push(false);
      }

      this.setState({  currentQuestionNumber: this.state.currentQuestionNumber+1,
        questionsAndSelectedAnswers : 
        [...this.state.questionsAndSelectedAnswers, 
            {currentQuestion: (this.state.currentQuestionNumber+1), selectedAnswers: [], selectedAnswersColor:x}
        ]

    }) ;
    }
       
        console.log("hello ", this.state);

   }

   answerClicked=(newAnswer)=>{
       console.log('answerClicked');
       let duplicates = false;
       let duplicatedAnswerIndex=null;
    
//+-
        //   let updatedObj = {//...this.state,
        //                 ...this.state.questionsAndSelectedAnswers,
        //                 ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
        //                  //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
        //                    ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion,
        //                    selectedAnswers: [...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers, x]
        //                 }


                        let updatedObj = JSON.parse(JSON.stringify(this.state.questionsAndSelectedAnswers));
                        for (let i=0; i<this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers.length; i++){
                            if (newAnswer==this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers[i]){
                                     duplicates = true;
                                     duplicatedAnswerIndex=i;                                
                            }
                        }

                        if(!duplicates){
                            updatedObj[this.state.currentQuestionNumber].selectedAnswers.push(newAnswer);
                            updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[newAnswer]=true;
                        } else {
                            updatedObj[this.state.currentQuestionNumber].selectedAnswers.splice(duplicatedAnswerIndex, 1);
                            updatedObj[this.state.currentQuestionNumber].selectedAnswersColor[newAnswer]=false;
                        }
                        
                        updatedObj[this.state.currentQuestionNumber].selectedAnswers.sort();
                            console.log('updatedObj ', updatedObj);

                           this.setState({questionsAndSelectedAnswers: updatedObj})

   }
    
    render() {
        console.log('this is testvar ', this.props.testvar);
        let questionOrResult=null;
        let correctAnswers = null;
        let checkedAnswers = null;

        if(this.state.currentQuestionNumber<this.props.questionare.length){
            questionOrResult= <div>
                                    <div class="questionNumber">{this.state.currentQuestionNumber +1} / {this.props.questionare.length}</div>
                                    <SingleQuestion answerClicked={this.answerClicked} 
                                            nextClicked={this.nextQuestion} 
                                            key={this.state.currentQuestionNumber} 
                                            currentQuestion={this.props.questionare[this.state.currentQuestionNumber]} 
                                            selectedAnswersArr={this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber]}
                                            selectedAnswersColor={this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswersColor}/>
                               </div>
                                        
        } else {
           questionOrResult=[]; 
           correctAnswers=[];
           checkedAnswers=[];
           for (let i=0; i<this.props.questionare.length; i++){ 
               checkedAnswers[i]=<div>
                                        <SingleQuestion
                                            checkedAnswers={this.state.checkedAnswers[i]} 
                                            currentQuestion={this.props.questionare[i]} 
                                            key={i}  
                                        />

                                 </div>
                
               correctAnswers[i]=<div>
                                        <SingleQuestion 
                                            checkedAnswers={this.state.correctAnswers[i]} 
                                            currentQuestion={this.props.questionare[i]} 
                                            key={i}  
                                        />
                                </div>
           }           
        }

        return (
            <div>
                    <div class="questionareBox">{questionOrResult}</div>
                    
                    <div class="questionare">
                        <div>
                            {this.state.checkedAnswers.length ? <div class="questions">Your answers</div> : null}
                            <div class="questionareBox">{checkedAnswers} </div>
                        </div>

                        <div>
                            {this.state.checkedAnswers.length ? <div class="questions">Correct answers</div> : null}
                            <div class="questionareBox">{correctAnswers} </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default QuestionsAndResult