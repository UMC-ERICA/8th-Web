import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrrottlePage = () => {
  const [rawScrollY, setRawScrollY] = useState<number>(0);
  const scrollY = useThrottle(rawScrollY, 500);

  const handleScroll = () => {
    setRawScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("리렌더링!");

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY = {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrrottlePage;