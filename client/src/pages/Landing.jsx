import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
        <h1>
          Job <span>Tracking</span> app
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          architecto ipsam, voluptates reprehenderit voluptate quos adipisci
          aperiam incidunt repellendus, neque dolores reiciendis laboriosam
          temporibus quasi tenetur dicta accusamus nisi vitae?
        </p>
        <Link to='/register' className="btn register-link">Register</Link>
        <Link to='/login' className="btn ">Demo User APP</Link>

        </div>
        <img src={main} alt="job hunt" srcSet="" className="img main-img"/>
        
      </div>
      
    </Wrapper>
  );
};

export default Landing;
