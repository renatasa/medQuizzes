import React from 'react' ;
import  {questionare} from './Questionare.js';
import QuestionsAndResult from '../QuestionsAndResult/QuestionsAndResult';

export const bradi=(props)=>{
    
        return (
            <div>
                <QuestionsAndResult questionare={questionare}
                testvar="this is testvar"/>
            </div>
        )
    
}

export default bradi
