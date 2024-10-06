import React from "react";
import "./styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { TabProvider } from "./context/TabsContext";
import { GlobalProvider } from "./context/GlobalContext";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingModal from "./components/LoadingModal";

function App() {
  return (
    <LoadingProvider>
      <GlobalProvider>
        <TabProvider>
          <Router>
            <LoadingModal />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </TabProvider>
      </GlobalProvider>
    </LoadingProvider>
  );
}

export default App;
