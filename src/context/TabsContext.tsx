import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextType {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useActiveTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useActiveTab must be used within a TabProvider");
  }
  return context;
};

export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<number>(8);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
