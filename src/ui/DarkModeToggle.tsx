import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Function to update the HTML element class
  const updateHtmlClass = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // On component mount: check stored preference or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      const isDark = storedTheme === "dark";
      setIsDarkMode(isDark);
      updateHtmlClass(isDark);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      updateHtmlClass(prefersDark);
    }
  }, []);

  // Toggle handler
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    updateHtmlClass(newMode);
  };

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
