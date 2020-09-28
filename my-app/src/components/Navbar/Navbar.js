import React from 'react';
import './Navbar.scss';
import {NavLink} from 'react-router-dom';

export const navbar=()=>{
        
    return (
            <div class="navbar">
                <NavLink to="/tachicardia"> <div class="nav-button">Tachyarrhythmia</div></NavLink>
                <NavLink to="/bradicardia"> <div class="nav-button">Bradyarrhythmia</div></NavLink>
                
            </div>
        )
    }

export default navbar
