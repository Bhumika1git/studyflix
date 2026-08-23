import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Learning from "./pages/Learning";
import Progress from "./pages/Progress";
import TeamMatch from "./pages/TeamMatch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/teammatch" element={<TeamMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;