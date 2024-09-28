// src/pages/About.js
import React from 'react';
import logo from '../images/Logo.png';
import './About.css';

const About = () => {
  return (
    <div className='about'>
        <img src={logo} alt="EZTechMovie logo" /> {/* Update this line */}
        <p>Welcome to EZTech Movie!  Your go-to destination for movie streaming and rentals!  
            EZTechMovie is a privately owned video streaming company with its
            headquarters located in San Diego, California. Pat Jones, the Founder
            and CEO, established EZTechMovie in April of 2019.</p>
        <p>We are passionate about bringing you an extensive selection of films and TV shows 
            with the convenience of flat-rate subscription packages.  EZTech currently serves
            over one million viewers and expanding!
        </p>
        <p>Looking ahead, our goal is to expand our reach and bring the joy of EZTech services
            to 10 million subscribers over the next three years.  Thank you for being a part of
            our family.  We look forward to delivering more entertainment and providing you an 
            amazing viewing experience!
        </p>
      </div>
  );
};

export default About;
