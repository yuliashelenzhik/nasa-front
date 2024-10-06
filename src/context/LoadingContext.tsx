import React, { createContext, useContext, useState, ReactNode } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (loading: boolean) => setIsLoading(loading);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
