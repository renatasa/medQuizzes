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
         questionsAndSelectedAnswers: [
            {
                currentQuestion: 0,
                selectedAnswers: []
            }
         ],
         currentQuestionNumber: 0
    }

    componentDidMount(){
        console.log('component did mount, questionsAndSelectedAnswers type ', Array.isArray(this.state.questionsAndSelectedAnswers) )
    }

    nextQuestion=()=>{
        console.log('next clicked');
        console.log('questionsAndSelectedAnswers from nextQuestion ', this.state.questionsAndSelectedAnswers);
      //  console.log(this.state.apple);
        console.log(this.state.currentQuestionNumber);
    //  console.log(this.state.currentQuestionNumber);
     //  this.setState(currentQuestionNumber=>({currentQuestionNumber: this.state.currentQuestionNumber+1}));
     //  this.setState(currentQuestionNumber=>({currentQuestionNumber: this.state.currentQuestionNumber+1}));
    //   this.setState({questionsAndSelectedAnswers : [...this.state.questionsAndSelectedAnswers, x]}) ;

       this.setState({  currentQuestionNumber: this.state.currentQuestionNumber+1,
                        questionsAndSelectedAnswers : 
                        [...this.state.questionsAndSelectedAnswers, 
                            {currentQuestion: (this.state.currentQuestionNumber+1), selectedAnswers: []}
                        ]

                    }) ;

        console.log("hello ", this.state);

   }

   answerClicked=(x)=>{
       console.log('answerClicked');
       let duplicates = false;
     //  let y = this.state.questionAndSelectedAnswers[this.state.currentQuestionNumber];
  //   let y=this.state.currentQuestionNumber;  
  //   console.log('y ', this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber]);
    // let newAnswers=[...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers, x];
     //this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers.push(x);
   //  let arr =[32, 33, 34];
   //  let newAnswers= arr.push(x);
   //  let newAnswers2= arr.push(8);

  //   console.log('newAnswers ', newAnswers);
  //   console.log('newAnswers2 ', newAnswers2);
  //   console.log('array proto ', arr.prototype);
  //   console.log('array ', arr.prototype);

  //   console.dir( this.answerClicked);

     //  console.log('newAnswers ', y);
    //    for( let i = 0; i < newAnswers.length; i++){ 
    //     if( newAnswers[i] === x){
    //       newAnswers.splice(i, 1);
    //       duplicates=true; 
    //     }
    //  }
    //  console.log('newanswers ', newAnswers);

    //  if(!duplicates){
    //     this.setState({...this.state, ...this.state.questionsAndSelectedAnswers, ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber], ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers, x });
    //  } else {
       // this.setState({selectedAnswers: [...newAnswers]})
    // }
      // let newAnswers= [...this.state.selectedAnswers, x] ;
     //  console.log('newanswers ', newAnswers);
     //  this.setState({selectedAnswers: [...this.state.selectedAnswers, x]});
     // console.log(x);
    //  console.log('state.selected answers', this.state.selectedAnswers);

  //  let z=this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers;
 //   console.log('z ', z);

    // let updatedObj = {
    //     ...this.state, 
    //     ...this.state.questionsAndSelectedAnswers, 
    //     [this.state.currentQuestionNumber]: {
    //         ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber], 
    //       //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion, 
    //         selectedAnswers: [x]}
    // }



    // let updatedObj = {
    //     ...this.state, 
    //     ...this.state.questionsAndSelectedAnswers, 
    //     [this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber]]: {
    //         ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber], 
    //       //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion, 
    //         selectedAnswers: [x]}
    // }



        // let updatedObj = Object.assign({}, this.state, {questionsAndSelectedAnswers:
        //     this.state.questionsAndSelectedAnswers.map((question, index)=>{
        //         if(index===question.currentQuestion){
        //             return Object.assign({}, question, {
        //                selectedAnswers: x
        //             })
        //         }
        //         return question
      //      })})

//       let a={b:'c', 
//       d: {e:1}
//   }

// let f={f: 'f'};

// let g={  h:'j', 
//          k: [{l:1}]
//       }
 
    //   let updatedObj = {//...this.state,
    //                     ...this.state.questionsAndSelectedAnswers,
    //                     [this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber]]:{
    //                        ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
    //                         ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion,
    //                         ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion.selectedAnswers, ...x
    //                     }}


    
//+-  veikia
          let updatedObj = {//...this.state,
                        ...this.state.questionsAndSelectedAnswers,
                        ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
                         //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
                           ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion,
                           selectedAnswers: [...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers, x]
                        }

                        console.log('is state.queationsAndAnswers an array? ',  Array.isArray(this.state.questionsAndSelectedAnswers))
                        console.log('is updatedObj an array? ',  Array.isArray(updatedObj))
             //           console.log(updatedObj);


    // let updatedObj = {//...this.state,
    //                  ...this.state.questionsAndSelectedAnswers,
    //                  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
    //                  //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
    //                  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion,
    //                  selectedAnswers: [...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers]
    //                    }


        //   let updatedObj = {//...this.state,
        //                 ...this.state.questionsAndSelectedAnswers,
        //                 [ [this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber]]:,
        //                  //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber],
        //                    ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion,
        //                    selectedAnswers: [...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].selectedAnswers]
        //   ]
        //                 }


        //   let updatedObj = {
        //     questionsAndSelectedAnswers : 
        //     [...this.state.questionsAndSelectedAnswers, 
        //         {currentQuestion: (this.state.currentQuestionNumber+1), selectedAnswers: []}
        //     ]
        //   }

          this.setState({questionsAndSelectedAnswers: updatedObj})



//let updatedObj2={...a, ...f};
// let updatedObj3={...a, d: {...a.d, ...f}};
//let updatedObj4={...g, k:[ ...f]};

// console.log('updatedObj2 ', updatedObj2);
// console.log('updatedObj3 ', updatedObj3);
//console.log('updatedObj4 ', updatedObj4);

    //Spread operator
        // ...this.state, 
        // ...this.state.questionsAndSelectedAnswers, 
        // [this.state.currentQuestionNumber]: {
        //     ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber], 
        //   //  ...this.state.questionsAndSelectedAnswers[this.state.currentQuestionNumber].currentQuestion, 
        //     selectedAnswers: [x]}
    

//    console.log('updatedobj ', updatedObj)
//    console.log('state ', this.state)
//    console.log('is state.queationsAndAnswers an array? ',  Array.isArray(this.state.questionsAndSelectedAnswers))

    // if(!duplicates){
    //     this.setState({ questionsAndSelectedAnswers : 
    //         [...this.state.questionsAndSelectedAnswers, 
    //             [this.state.currentQuestionNumber]: {...currentQuestion, selectedAnswers: [...newAnswers]}
    //         ]
    //     })

    // }

   }
    
    render() {
//        console.log(questionare, 'from tachi');
        console.log('this.state.questionsAndselectedAnswers from render', this.state.questionsAndSelectedAnswers );
        console.log('this.state.questionsAndselectedAnswers from render TYPE OF ', typeof this.state.questionsAndSelectedAnswers );
        console.log('this.state.questionsAndselectedAnswers from render isArray ',  Array.isArray(this.state.questionsAndSelectedAnswers) );
        console.log("this.state from render ", this.state);
 //       console.log("nextQuestion ", this.nextQuestion.prototype);
 //       console.dir("nextQuestion dir ", this.nextQuestion);
     //   console.log("g var ", this.g);
        
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

