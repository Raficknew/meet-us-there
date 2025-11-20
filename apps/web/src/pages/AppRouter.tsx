import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./home/HomePage";
import LoadingPage from "./loading/LoadingPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
};
