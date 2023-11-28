import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, "isDarkMode");

  const toggleDarkMode = () => setIsDarkMode(isDark => !isDark);

  useEffect(() => {
    document.documentElement.classList.remove(isDarkMode ? 'light' : 'dark');
    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode])
  
  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const value = useContext(ThemeContext);

  if(!value) {
    throw new Error('ThemeContext was used outside of ThemeContextProvider !');
  }
  
  return value;
}


export default ThemeContextProvider;
