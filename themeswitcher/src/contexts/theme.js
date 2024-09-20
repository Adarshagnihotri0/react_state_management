import {createContext, useContext} from "react";

export const ThemeContext = createContext({

    //* default values
    themeMode:  "light", //default value 
    darkTheme: () => {},
    lightTheme: () => {},
})

export const ThemeProvider = ThemeContext.Provider


//! custom hook
export default function useTheme (){
    return useContext(ThemeContext);
}