import { BiUpArrowAlt } from "react-icons/bi";
import "./BackToTop.scss";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    isVisible && (
      <button className="back_to_top" onClick={scrollToTop}>
        <BiUpArrowAlt className="top_icon" />
      </button>
    )
  );
};

export default BackToTop;
