import React, { createContext, useState } from "react";

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <ModelContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
