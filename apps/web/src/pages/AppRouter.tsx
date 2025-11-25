import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./home/HomePage";
import LoadingPage from "./loading/LoadingPage";
import CallbackPage from "./loginCallback/CallbackPage";
import { GroupCreatePage } from "./groupCreate/GroupCreatePage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/login/callback" element={<CallbackPage />} />

        <Route path="/group/create" element={<GroupCreatePage />} />
      </Routes>
    </Router>
  );
};
