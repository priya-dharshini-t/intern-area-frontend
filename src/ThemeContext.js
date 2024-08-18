// src/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default color

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <ThemeContext.Provider value={{ backgroundColor, changeBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
