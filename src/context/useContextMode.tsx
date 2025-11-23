import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "../components/them/them";

const ThemeModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

export const useContextMode = () => useContext(ThemeModeContext);

export function ThemeModeProvider({ children }: { children?: ReactNode }) {
  const [mode, setMode] = useState(
    "light"
  );

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(mode === "dark" ? DarkTheme.palette : LightTheme.palette),
          mode: (mode as "light" | "dark"),
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
