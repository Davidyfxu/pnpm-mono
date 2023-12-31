import main from "../../assets/images/main.svg";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components";
import Wrapper from "../../assets/wrappers/LandingPage";
const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to={"/"} />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
          <Link to="/register" className="btn btn-hero">
            Login / Register
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
