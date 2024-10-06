import React from "react";
import { useActiveTab } from "../context/TabsContext";
import CategoryView from "./views/CategoryView";

const TabsContainer = () => {
  const { activeTab } = useActiveTab();

  return (
    <div className="tab-container">
      {activeTab && <CategoryView activeTab={activeTab} />}
    </div>
  );
};

export default TabsContainer;
