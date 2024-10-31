import React from "react";
import { FaChevronUp } from "react-icons/fa";
import "./About.css";

const ScrollToTop = (props) => {
  const [showScrollTopButton, setShowScrollTopButton] = React.useState(false);

  React.useEffect(() => {
    if (window.screenY > 300) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  }, []);

  const scrollTop = (elementReference) => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  return (
    <div onClick={scrollTop} className={props.className}>
      <p>Scroll To Top</p>
      <FaChevronUp />
    </div>
  );
};

export default ScrollToTop;
