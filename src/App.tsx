import styled, { ThemeProvider } from "styled-components";
import Loading from "./common/Loading";
import { useGeneralContext } from "./generalContext";
import Layout from "./pages";
import { getTheme } from "./styles/theme";
import { useThemeContext } from "./styles/themeContext";
import "./utilis/i18n";
import { useEffect } from "react";

function App() {
  const { themeMode, setThemeMode } = useThemeContext();
  const { isLoading } = useGeneralContext();
  useEffect(() => {
    // change body direction based on current lang
    if (JSON.parse(localStorage.getItem("lang") as string) === "ar")
      document.body.classList.add("rtl");
    else document.body.classList.remove("rtl");

    // add dark class to body based on current theme
    if (JSON.parse(localStorage.getItem("theme") as string) === "dark")
      document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, []);
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      {/* {isLoading ? <Loading /> : <Layout />} */}
      <Layout />
    </ThemeProvider>
  );
}

export default App;
