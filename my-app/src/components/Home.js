import React, { Component } from 'react';
//import homePhoto from '../assets/img/landing_page.jpg';
import './Home.scss';

export class Home extends Component {
    render() {
        return (
            <div class="Home">
                <h1 class="headline headline-1">Wellcome to medQuizzes!</h1>
                <h2 class="headline headline-2">Please choose your topic</h2>
                <div class="topic">Tachyarrhythmia </div>
                <div class="topic">Bradyarrhythmia </div>  
       
                <p class="info">This non-profit application is created for demonstration purposes only! You can find detailed guidelines at www.escardio.org . </p>
            
            </div>
        )
    }
}

export default Home
