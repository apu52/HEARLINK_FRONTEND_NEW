import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import {
  User,
  Users,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  MessageSquare,
  BarChart,
  FileText,
  Headphones,
  Home,

  Info,
  AlertCircle,
  Check,
  X,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
const TeacherAnalytics = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const BASE_URL = 'https://ecc0-116-204-174-95.ngrok-free.app';
  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const fetchStudents = async () => {
      const generateHeaders = () => {
        const headers = {
          'Content-Type': 'application/json'
        };
        if (BASE_URL.includes('ngrok')) {
          headers['ngrok-skip-browser-warning'] = 'true';
        }
        return headers;
      };

      try {
        const res = await axios.get(`${BASE_URL}/api/students/all`, {
          headers: generateHeaders()
        });

        console.log("Response Content-Type:", res.headers["content-type"]);
        console.log("API Response:", res.data);

        const fetchedStudents = Array.isArray(res.data.students) ? res.data.students.map((s) => {
          const pieText = s.analysis?.pie_chart_analysis;

          const feedbackSections = pieText
              ? extractFeedbackSections(pieText)
              : {
                strengths: [],
                growthAreas: [],
                recommendations: []
              };

          return {
            id: s.id,
            name: s.username,
            status: s.analysis?.top_emotion || "unknown",
            studentId: `S-${s.id.toString().padStart(4, "0")}`,
            grade: "10A",
            initials: getInitials(s.username),
            chartImageBase64: s.analysis?.chart_image_base64 || "",
            emotions: {
              engagement: 80,
              focus: 75,
              satisfaction: 85,
              distress: s.analysis?.distress_percentage ?? 0,
              confusion: 10
            },
            strengths: feedbackSections.strengths,
            growthAreas: feedbackSections.growthAreas,
            recommendations: feedbackSections.recommendations,
            emotionsDistribution: [
              { name: "Engagement", value: 80, color: "#3B82F6" },
              { name: "Focus", value: 75, color: "#60A5FA" },
              { name: "Satisfaction", value: 85, color: "#93C5FD" },
              { name: "Distress", value: s.analysis?.distress_percentage ?? 0, color: "#EF4444" },
              { name: "Confusion", value: 10, color: "#F59E0B" }
            ]
          };
        }) : [];

        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);



  const extractFeedbackSections = (text) => {
    const sections = {
      strengths: [],
      growthAreas: [],
      recommendations: []
    };
    const match = {
      strengths: /Strengths\n([\s\S]*?)\n\n/,
      growthAreas: /Areas for Growth\n([\s\S]*?)\n\n/,
      recommendations: /Recommended Actions\n([\s\S]*)/
    };

    for (let key in match) {
      const m = text.match(match[key]);
      if (m && m[1]) {
        sections[key] = m[1].split("\n").filter(Boolean);
      }
    }
    return sections;
  };

  const getInitials = (name) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "happy":
        return "bg-green-500";
      case "sad":
        return "bg-red-500";
      case "neutral":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "happy":
        return "Positive";
      case "sad":
        return "Distressed";
      case "neutral":
        return "Neutral";
      default:
        return "Unknown";
    }
  };

  const getBarColor = (emotion, value) => {
    if (emotion === "distress" || emotion === "confusion") {
      return value > 25 ? "bg-red-500" : value > 15 ? "bg-yellow-500" : "bg-green-500";
    } else {
      return value > 75 ? "bg-blue-500" : value > 50 ? "bg-blue-400" : "bg-red-500";
    }
  };

  const handleCheckStudent = (student) => {
    setSelectedStudent(student);
    setLoading(true);
    setReportGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setReportGenerated(true), 500);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar (reusing from your template) */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center ${collapsed ? "justify-center w-full" : ""}`}>
            {!collapsed && (
              <img src="/placeholder.svg" alt="HearLink Logo" className="h-8 w-auto mr-3" />
            )}
            {!collapsed && <span className="text-xl font-bold text-blue-900">HearLink</span>}
            {collapsed && <img src="/api/placeholder/32" alt="HearLink" className="h-8 w-auto" />}
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-full hover:bg-gray-200 ${collapsed ? "hidden" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/teacher-dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a
                href="/Classes"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Users className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Classes</span>}
              </a>
            </li>
            <li>
              <a
                href="/Calendar"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Calendar className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Calendar</span>}
              </a>
            </li>
            <li>
              <a
                href="/teacher-materials"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <BookOpen className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Materials</span>}
              </a>
            </li>
            <li>
              <a
                href="/teacher-analytics"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-blue-700 bg-blue-50 font-medium"
              >
                <BarChart className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Analytics</span>}
              </a>
            </li>
            <li>
              <a
                href="/emotion_analysis"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <MessageSquare className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Emotion Analysis</span>}
              </a>
            </li>
          </ul>
          <div className="border-t border-gray-200 mt-6 pt-6">
            <ul className="space-y-2">
              <li>
                <a
                  href="/teacher-settings"
                  className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
                >
                  <Settings className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Settings</span>}
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="flex items-center p-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Logout</span>}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-900 mr-4">Student Emotional Analysis</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <div className="ml-4 flex items-center">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Prof. David Lee</p>
                <p className="text-xs text-gray-500">Physics Teacher</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Student Emotion Check Section - Moved to top */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="p-4 border-b border-gray-200 bg-blue-50">
              <h2 className="text-lg font-semibold text-blue-800">Student Emotional Status Monitor</h2>
              <p className="text-sm text-blue-600">Select a student to view detailed emotional analysis and get personalized teaching recommendations</p>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap items-center justify-between mb-4 bg-blue-50 p-3 rounded-lg">
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">
    Positive (
                      {students.filter(s => s.status === "happy" || s.status === "neutral").length})
  </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Distressed ({students.filter(s => s.status === "sad").length})</span>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Check All Students
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {students.map(student => (
                  <div
                    key={student.id}
                    className={`border rounded-lg p-4 bg-white hover:shadow-md transition-all ${
                      selectedStudent?.id === student.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium`}>
                          {student.initials}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.grade} • {student.studentId}</div>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full ${getStatusColor(student.status)} flex items-center justify-center text-white`}>
                        {student.status === "happy" && <Check className="h-3 w-3" />}
                        {student.status === "neutral" && <AlertCircle className="h-3 w-3" />}
                        {student.status === "sad" && <X className="h-3 w-3" />}
                      </div>
                    </div>

                    <div className="text-sm mb-3">
                      <div className="mb-1">
                        <span className="font-medium">Top Emotion:</span>{" "}
                        {getStatusText(student.status)}
                      </div>
                      <div>
                        <span className="font-medium">Emotional Distress:</span>{" "}
                        {student.emotions.distress}%
                      </div>
                    </div>


                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        <div className={`h-1 w-8 rounded ${getBarColor("engagement", student.emotions.engagement)}`}></div>
                        <div className={`h-1 w-8 rounded ${getBarColor("focus", student.emotions.focus)}`}></div>
                        <div className={`h-1 w-8 rounded ${getBarColor("satisfaction", student.emotions.satisfaction)}`}></div>
                      </div>
                      <button
                        onClick={() => handleCheckStudent(student)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedStudent?.id === student.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {selectedStudent?.id === student.id ? 'Selected' : 'Check'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Analysis and Recommendations */}
          {selectedStudent && reportGenerated && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Student Report</h2>

                {/* Student Name and ID */}
                <div className="mb-4">
                  <div className="text-lg font-medium">
                    {selectedStudent.name} ({selectedStudent.studentId})
                  </div>
                  <div className="text-sm text-gray-500">{selectedStudent.grade}</div>
                </div>

                {/* Pie Chart Image */}
                <div className="mb-6 max-w-xs">
                  <img
                      src={`data:image/png;base64,${selectedStudent.chartImageBase64}`}
                      alt="Pie Chart"
                      className="rounded shadow-md"
                  />
                </div>

                {/* Analysis Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-blue-600">Strengths</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedStudent.strengths.length > 0 ? (
                          selectedStudent.strengths.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))
                      ) : (
                          <li>No strengths listed.</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-yellow-600">Growth Areas</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedStudent.growthAreas.length > 0 ? (
                          selectedStudent.growthAreas.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))
                      ) : (
                          <li>No growth areas listed.</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-green-600">Recommendations</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {selectedStudent.recommendations.length > 0 ? (
                          selectedStudent.recommendations.map((item, idx) => (
                              <li key={idx}>{item}</li>
                          ))
                      ) : (
                          <li>No recommendations listed.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
          )}




        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;
