// import React from 'react';
// import SingleQuestion from '../SingleQuestion/SingleQuestion';
// import  {questionare} from './Questionare.js';

// const tachi =()=> {
//    let currentQuestionNumber=0;
//    let  nextQuestion=()=>{
//         currentQuestionNumber+=1;
//         console.log(currentQuestionNumber, " hello");
//         console.log(questionare[currentQuestionNumber]);
//    }
    
//         console.log(questionare, 'from tachi');
        
        
//         return (
//             <div>
//                 <SingleQuestion clicked={nextQuestion} currentQuestion={questionare[currentQuestionNumber]} />
//             </div>
//         )
// }

// export default tachi


import React, { Component } from 'react';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import  {questionare} from './Questionare.js';

export class Tachi extends Component {
    state={
         currentQuestionNumber: 0,
         selectedAnswers: [],
         apple:null
    }

    nextQuestion=()=>{
        console.log('next clicked');
        console.log(this.state.apple);
        console.log(this.state.currentQuestionNumber);
    //  console.log(this.state.currentQuestionNumber);
       this.setState(currentQuestionNumber=>({currentQuestionNumber: this.state.currentQuestionNumber+1}));
    //     console.log("hello");

   }

   answerClicked=(x)=>{
       console.log('answerClicked');
      // this.setState({...this.state.selectedAnswers, answerNumber});
      console.log(x);
   }
    
    render() {
        console.log(questionare, 'from tachi');
        
        return (
            <div>
                <SingleQuestion answerClicked={this.answerClicked} 
                                nextClicked={this.nextQuestion} 
                                key={this.state.currentQuestionNumber} 
                                currentQuestion={questionare[this.state.currentQuestionNumber]} />
            </div>
        )
    }
}

export default Tachi

