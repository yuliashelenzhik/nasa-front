import React from "react";
import { useActiveTab } from "../context/TabsContext";
import { useGlobalContext } from "../context/GlobalContext";

const CategoriesHeadlines: React.FC = () => {
  const { eventCounts, error } = useGlobalContext();
  const { activeTab, setActiveTab } = useActiveTab();

  const getCategoryStyles = (categoryId: number) => {
    switch (categoryId) {
      case 8:
        return { backgroundColor: "#FFD166", color: "white" };
      case 10:
        return { backgroundColor: "#028090", color: "white" };
      case 12:
        return { backgroundColor: "#FF6B35", color: "white" };
      case 15:
        return { backgroundColor: "#6FB1E0", color: "white" };
      default:
        return { backgroundColor: "#B56576", color: "white" };
    }
  };

  const handleTabClick = (categoryId: number) => {
    setActiveTab(categoryId);
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="headlines">
      <ul>
        {eventCounts.map((event: any) => (
          <li
            key={event.categoryId}
            style={getCategoryStyles(event.categoryId)}
            onClick={() => handleTabClick(event.categoryId)}
            className={`tab ${event.categoryId === activeTab ? "active" : ""}`}
          >
            <h2>{event.count}</h2>
            <h3>{event.categoryTitle}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesHeadlines;
