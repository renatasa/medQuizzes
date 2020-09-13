import React, { Component } from 'react';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import  {questionare} from './Questionare.js';

export class Tachi extends Component {
    state={
         questionsAndSelectedAnswers: [
            {
                currentQuestion: 0,
                selectedAnswers: []
            }
         ],
         currentQuestionNumber: 0
    }

    nextQuestion=()=>{
        console.log('next clicked');

        this.setState({  currentQuestionNumber: this.state.currentQuestionNumber+1,
            questionsAndSelectedAnswers : 
            [...this.state.questionsAndSelectedAnswers, 
                {currentQuestion: (this.state.currentQuestionNumber+1), selectedAnswers: []}
            ]

        }) ;
       

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
                        } else {
                            updatedObj[this.state.currentQuestionNumber].selectedAnswers.splice(duplicatedAnswerIndex, 1);
                        }
                        
                        updatedObj[this.state.currentQuestionNumber].selectedAnswers.sort();
                            console.log('updatedObj ', updatedObj);

                           this.setState({questionsAndSelectedAnswers: updatedObj})

//console.log('is state.queationsAndAnswers an array? ',  Array.isArray(this.state.questionsAndSelectedAnswers))
//                        console.log('is updatedObj an array? ',  Array.isArray(updatedObj))

   }
    
    render() {
        console.log('this.state from render ', this.state);
        // console.log('this.state.questionsAndselectedAnswers from render', this.state.questionsAndSelectedAnswers );
        // console.log('this.state.questionsAndselectedAnswers from render TYPE OF ', typeof this.state.questionsAndSelectedAnswers );
        // console.log('this.state.questionsAndselectedAnswers from render isArray ',  Array.isArray(this.state.questionsAndSelectedAnswers) );
        // console.log("this.state from render ", this.state);
        let questionOrResult=null;

        if(this.state.currentQuestionNumber<questionare.length){
            questionOrResult= <SingleQuestion answerClicked={this.answerClicked} 
                                            nextClicked={this.nextQuestion} 
                                            key={this.state.currentQuestionNumber} 
                                            currentQuestion={questionare[this.state.currentQuestionNumber]} />
        } else {
           questionOrResult= <div>You have finished the quiz</div>
        }
        
        return (
            <div>
                {questionOrResult}
            </div>
        )
    }
}

export default Tachi

