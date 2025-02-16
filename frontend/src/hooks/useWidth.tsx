import { useEffect, useState } from "react";

export const useWidth = (): boolean => {
  const [width, setWidth] = useState<number | null>(
    window.innerWidth || document.documentElement.clientWidth
  );
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth || document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (width ?? window.innerWidth) <= 768;
};
