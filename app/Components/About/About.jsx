import React from "react";
import "./About.css";
import BackToTop from "./BackToTop";

function About() {
  return (
    <div className="about-container">
      <h2 className="about-heading">What is this?</h2>
      <div className="about-contents">
        <p>
          I am a self taught artist and in my spare time, I like to draw. This
          is a website where I post my art. I draw a lot of things so hopefully
          there's something for everybody.
          <br />
          <br /> You can view everything together in the Gallery, or you can
          react or comment to posts in Posts.
          <br />
          <br /> Apart from art, I am also a Computer Science and Engineering
          student, so I built this as a challenge to test my web development
          skills. I'm pretty new to web development (in fact this is my first
          actual website), so if you find any bugs, issues or better
          optimizations please do let me know.
          <br />
          <br />
          This website was built using the PERN stack.
        </p>
      </div>
      <BackToTop className="back-to-top" />
    </div>
  );
}

export default About;
