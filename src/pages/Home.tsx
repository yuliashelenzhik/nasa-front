import React from "react";
import Header from "../components/Header";
import Welcome from "../components/Welcome";
import CategoriesHeadlines from "../components/CategoriesHeadlines";
import TabsContainer from "../components/TabsContainer";
import FilterWidjet from "../components/FilterWidjet";
import FilterResults from "../components/FilterResults";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="main-layout">
        <Welcome />
        <FilterWidjet />
        <div>
          <CategoriesHeadlines />
          <TabsContainer />
        </div>
        <FilterResults />
      </div>
    </>
  );
};

export default Home;
