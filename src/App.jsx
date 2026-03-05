import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import GreetingCards from "./pages/GreetingCards";
// import PersonalCard from "./pages/PersonalCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="greeting-cards" element={<GreetingCards />} />
        <Route path="personal-card" element={<PersonalCard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
