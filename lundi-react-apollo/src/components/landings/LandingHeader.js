import React from "react";
import Login from "../Login";

const LandingHeader = () => (
  <div className="landing-header--container">
    <header className="landing-header__header">
      <img
        className="landing-header__header__logo"
        src="/lundi-logo.png"
        alt="logo"
      />
      <h3>Lundi</h3>
    </header>
    <div className="landing-header__content">
      <div className="landing-header__content--slogan">
        <span className="landing-header__content--slogan__main">
          Single but organized.
        </span>
        <span className="landing-header__content--slogan__des">
          Lundi is a project management app designed specifically for people who
          works alone. It's best suited for someone working on their own side
          projects yet does not have anyone to collaborate with. (in case it's
          not obvious enough, that <span className="someone">someone</span> is
          me.)
        </span>
        <div className="landing-header__content--slogan__btns">
          <button>Get to know me</button>
          <button>Github</button>
        </div>
      </div>
      <Login />
    </div>
  </div>
);

export default LandingHeader;
