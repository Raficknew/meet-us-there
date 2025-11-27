import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./home/HomePage";
import LoadingPage from "./loading/LoadingPage";
import CallbackPage from "./loginCallback/CallbackPage";
import LoginPage from "./login/LoginPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/login/callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
};
