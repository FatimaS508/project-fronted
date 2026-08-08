import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

//goals pages
import GoalsPage from "./pages/goals/GoalsPage";
import GoalDetailsPage from "./pages/goals/GoalDetailsPage";
import CreateGoalPage from "./pages/goals/CreateGoalPage";
import EditGoalPage from "./pages/goals/EditGoalPage";


import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/goals" element={<ProtectedRoute> <GoalsPage/> </ProtectedRoute>}></Route>
        <Route path="/goals/create" element={<ProtectedRoute><CreateGoalPage/></ProtectedRoute>}></Route>
        <Route path="/goals/:id" element={<ProtectedRoute><GoalDetailsPage/> </ProtectedRoute>}></Route>
        <Route path="/goals/:id/edit" element={<ProtectedRoute><EditGoalPage/> </ProtectedRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
