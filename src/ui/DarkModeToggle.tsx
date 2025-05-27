import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const updateHtmlClass = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Always manually control theme, no system preference fallback
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";

    setIsDarkMode(isDark);
    updateHtmlClass(isDark);
  }, []);

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    updateHtmlClass(newMode);
  };

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded cursor-pointer "
    >
      {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </button>
  );
};

export default DarkModeToggle;