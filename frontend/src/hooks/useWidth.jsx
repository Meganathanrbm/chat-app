import React, { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth
  );
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth || document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width <= 768;
};
