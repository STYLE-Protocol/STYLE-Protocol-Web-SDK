import React, { createContext, useState } from "react";

export const NFTViewerContext = createContext();

export const NFTViewerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progressState, setProgressState] = useState(0);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <NFTViewerContext.Provider
      value={{
        loading,
        setLoading,

        progressState,
        setProgressState,

        error,
        setError,

        active,
        setActive,
      }}
    >
      {children}
    </NFTViewerContext.Provider>
  );
};
