import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";


import GoalsPage from "./pages/goals/GoalsPage";
import GoalDetailsPage from "./pages/goals/GoalDetailsPage";
import CreateGoalPage from "./pages/goals/CreateGoalPage";
import EditGoalPage from "./pages/goals/EditGoalPage";


import DomainList from "./pages/Domains/DomainList";
import DomainDetails from "./pages/Domains/DomainDetails";
import CreateDomain from "./pages/Domains/CreateDomain";
import EditDomain from "./pages/Domains/EditDomain";

import Page404 from "./pages/Page404";


import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
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
        <Route path="/goals/create/:id" element={<ProtectedRoute><CreateGoalPage/></ProtectedRoute>}></Route>
        <Route path="/goals/:id" element={<ProtectedRoute><GoalDetailsPage/> </ProtectedRoute>}></Route>
        <Route path="/goals/:id/edit" element={<ProtectedRoute><EditGoalPage/> </ProtectedRoute>}></Route>

        <Route path="/domains" element={<ProtectedRoute> <DomainList/> </ProtectedRoute>}></Route>
        <Route path="/domains/create" element={<ProtectedRoute> <CreateDomain/> </ProtectedRoute>}></Route>
        <Route path="/domains/:id" element={<ProtectedRoute> <DomainDetails/> </ProtectedRoute>}></Route>
        <Route path="/domains/:id/edit" element={<ProtectedRoute><EditDomain/> </ProtectedRoute>}></Route>
        <Route path='*' element={<Page404/>}></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
