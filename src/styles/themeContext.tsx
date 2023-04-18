import { createContext, useContext, useState, useEffect } from 'react'
import { mode } from './theme';

export type GlobalContentType = {
    themeMode: string
    setThemeMode:(value: string) => void
  }

const GlobalThemeContext = createContext<GlobalContentType>({
    themeMode: mode,
    setThemeMode: () => {},
})

export const useThemeContext = () => useContext(GlobalThemeContext); 

const ThemeContextProvider = ({children}) => {
  const [themeMode, setThemeMode] = useState<string>(mode);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themeMode));
  }, [themeMode])

  return (
    <GlobalThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </GlobalThemeContext.Provider>
  )
}

export default ThemeContextProvider