import React from 'react';
//import homePhoto from '../assets/img/landing_page.jpg';
import './Home.scss';
import Navbar from '../Navbar/Navbar';
import TestFinished from '../TestFinished/TestFinished';

export const home=()=>{
    
        return (
            <div class="Home">
                <Navbar/>
                {/* <TestFinished/> */}
            </div>
        )
    
}

export default home
