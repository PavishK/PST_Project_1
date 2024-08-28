import React from 'react'
import './style.css';
import Logo from '../assets/aboutus.png';

function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-item">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem exercitationem officia obcaecati et autem a consectetur animi nulla, vel corporis laboriosam doloremque tenetur sequi impedit asperiores dolor voluptatibus! Ducimus, ratione.</p>
        </div>
        <div className="about-item">
          <img src={Logo} alt=''/>
        </div>
      </div>
    </>
  )
}

export default About