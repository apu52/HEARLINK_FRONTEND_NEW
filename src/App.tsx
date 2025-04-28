
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginStudent from "./pages/LoginStudent";
import LoginTeacher from "./pages/LoginTeacher";
import SignupStudent from "./pages/SignupStudent";
import SignupTeacher from "./pages/SignupTeacher";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import EmotionAnalysis from "./pages/Dashboard/emotion_analysis";
import Calendar from "./pages/Dashboard/Calendar";
import Classes from "./pages/Dashboard/Classes";
import TeacherMaterials from "./pages/Dashboard/teacher-materials";
import TeacherAnalytics from "./pages/Dashboard/teacher-analytics";
import StudentCourses from "./pages/Dashboard/student-courses";
import StudentCalendar from "./pages/Dashboard/student-calendar";
import LearningMaterials from "./pages/Dashboard/Learning_Materials";
import Speechtotext from "./pages/Dashboard/speech-to-text";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/login-teacher" element={<LoginTeacher />} />
          <Route path="/signup-student" element={<SignupStudent />} />
          <Route path="/signup-teacher" element={<SignupTeacher />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/emotion_analysis" element={<EmotionAnalysis />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/teacher-materials" element={<TeacherMaterials />} />
          <Route path="/teacher-analytics" element={<TeacherAnalytics />} />
          <Route path="/student-calendar" element={<StudentCalendar />} />
          <Route path="/student-courses" element={<StudentCourses />} />
          <Route path="/Learning_Materials" element={<LearningMaterials />} />
          <Route path="/speech-to-text" element={<Speechtotext />} />




          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
