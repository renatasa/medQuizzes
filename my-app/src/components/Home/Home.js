import React, { Component } from 'react';
//import homePhoto from '../assets/img/landing_page.jpg';
import './Home.scss';
import {NavLink} from 'react-router-dom';
import Tachi from '../Tachi/Tachi';

export class Home extends Component {
    render() {
        return (
            <div class="Home">
                <h1 class="headline headline-1">Wellcome to medQuizzes!</h1>
                <h2 class="headline headline-2">Please choose your topic</h2>
                <NavLink to="/tachicardia"><div class="topic"> Tachyarrhythmia </div> </NavLink>
            </div>
        )
    }
}

export default Home
