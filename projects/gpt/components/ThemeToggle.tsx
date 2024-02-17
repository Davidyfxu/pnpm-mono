"use client";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  light: "light",
  night: "night",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.night : themes.light;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "light" ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};
export default ThemeToggle;
