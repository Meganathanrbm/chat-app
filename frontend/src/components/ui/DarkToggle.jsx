import React, { useEffect, useState } from "react";

const DarkToggle = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  useEffect(() => {
    if (darkToggle) {
      document.documentElement.classList.toggle("dark");
    } else {
      document.documentElement.classList.toggle("dark");
    }
  }, [darkToggle]);
  return (
    <div className="form-control w-52 absolute top-10 left-10">
      <label className="label cursor-pointer">
        <input
          onChange={(e) => setDarkToggle((prev) => !prev)}
          type="checkbox"
          className="toggle toggle-primary"
        />
      </label>
    </div>
  );
};

export default DarkToggle;
