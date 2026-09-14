import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthFlow from "./pages/AuthFlow";
import Settings from "./pages/Settings";
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
        <Route path="/login" element={<AuthFlow />} />
        <Route path="/signup" element={<AuthFlow />} />
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/teammatch" element={<TeamMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;