import React from 'react';
import './TestFinished.scss';
import {NavLink} from 'react-router-dom';

export const testFinished=(props)=>{
    
    return (
        <div class="testFinished">
            <div class="testFinished-results">You have completed the test!</div>
            <div class="testFinished-button" onClick={()=>props.toggleResults()}>Check results</div>
            
        </div>
    )

}

export default testFinished

