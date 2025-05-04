
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Book,
  Calendar,
  Headphones,
  Settings,
  LogOut,
  Bell,
  Search,
  FileText,
  MessageSquare,
  BookOpen,
  Mic,
  Users
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = 'https://ecc0-116-204-174-95.ngrok-free.app';
const StudentDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const courses = [
    { id: 1, name: "Introduction to Netowrks", teacher: "Prof. David Lee", progress: 65 },
    { id: 2, name: "Automata 101", teacher: "Dr. Sarah Johnson", progress: 42 },
    { id: 3, name: "Advanced Algorithms", teacher: "Prof. Robert Chen", progress: 78 },
  ];

  const upcomingClasses = [
    { id: 1, name: "DataBase & Management Syatem", time: "9:00 AM", date: "Today" },
    { id: 2, name: "Image Processing", time: "1:00 PM", date: "Tomorrow" },
  ];

  const assignments = [
    { id: 1, title: "Topology", course: "Computer organisation", due: "Tomorrow", status: "In Progress" },
    { id: 2, title: "Striver 75 days DAA Sheet", course: "DAA", due: "In 3 days", status: "Not Started" },
  ];
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const handleLogout = async () => {
    const generateHeaders = () => {
      const headers: Record<string, string> = {};
      if (BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }
      return headers;
    };
    try {
      const response = await fetch(`${BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...generateHeaders(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        // You can redirect to the login page or any other page after successful logout
        navigate("/login");
      } else {
        alert(data.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred.");
    }
  };


  useEffect(() => {
    // Get the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
            className={`bg-white shadow-md transition-all duration-300 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className={`flex items-center ${collapsed ? "justify-center w-full" : ""}`}>
              {!collapsed && (
                  <img src="images\Hearlink.png" alt="HearLink Logo" className="h-8 w-auto mr-3" />
              )}
              {!collapsed && <span className="text-xl font-bold text-hearlink-900">HearLink</span>}
              {collapsed && <img src="images\Hearlink.png" alt="HearLink" className="h-8 w-auto" />}
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
                <Link
                    to="/student-dashboard"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-hearlink-900 bg-hearlink-50"
                >
                  <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link
                    to="/student-courses"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <Book className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>My Courses</span>}
                </Link>
              </li>
              <li>
                <Link
                    to="/student-calendar"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <Calendar className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Calendar</span>}
                </Link>
              </li>
              <li>
                <Link
                    to="/emotion_analysis"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <MessageSquare className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Emotion Analysis</span>}
                </Link>
              </li>
              <li>
                <Link
                    to="/speech-to-text"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <Headphones className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Speech to Text</span>}
                </Link>
              </li>
              <li>
                <Link
                    to="/learning_materials"
                    className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <FileText className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Learning Materials</span>}
                </Link>
              </li>
            </ul>
            <div className="border-t border-gray-200 mt-6 pt-6">
              <ul className="space-y-2">
                <li>
                  <Link
                      to="/student-settings"
                      className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                  >
                    <Settings className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                    {!collapsed && <span>Settings</span>}
                  </Link>
                </li>
                <li>
                  <button
                      onClick={handleLogout}
                      className="flex items-center p-2 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                    {!collapsed && <span>Logout</span>}
                  </button>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hearlink-500"
                />
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
              <div className="ml-4 flex items-center">
                {/* Circle with initials */}
                <div className="h-10 w-10 flex items-center justify-center bg-zinc-700 text-white rounded-full">
                  {/* Display the first letter of the username */}
                  <span className="text-lg font-semibold">
      {username ? username.charAt(0).toUpperCase() : "?"}
    </span>
                </div>

                <div className="ml-4">
                  {/* "Welcome Back" with a distinct color */}
                  <p className="text-sm text-zinc-600">Welcome Back</p>

                  {/* Username with a stronger color for emphasis */}
                  <p className="text-sm  font-medium text-black italic "  >{username ? username : "Guest"}</p>
                </div>
              </div>


            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Student Dashboard</h1>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-hearlink-600 to-hearlink-700 rounded-lg p-6 text-white mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome back, {username}</h2>
                  <p className="mb-4">You have 2 classes scheduled for today and 2 pending assignments.</p>
                  <Button className="bg-white text-hearlink-600 hover:bg-gray-100">
                    View Assignments
                  </Button>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-sm font-medium mb-2">Next Class</div>
                    <div className="text-xl font-bold">Research Methodology</div>
                    <div className="text-sm">9:00 AM - 10:30 AM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Link to="/speech-to-text">
                <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors h-full">
                  <div className="bg-hearlink-50 p-3 rounded-full inline-block mb-3">
                    <Headphones className="h-6 w-6 text-hearlink-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Speech to Text</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Convert speech to text for better learning
                  </p>
                </div>
              </Link>
              <Link to="/content-generation">
                <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors h-full">
                  <div className="bg-hearlink-50 p-3 rounded-full inline-block mb-3">
                    <FileText className="h-6 w-6 text-hearlink-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Content Generation</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Generate study materials tailored to you
                  </p>
                </div>
              </Link>
              <Link to="/study-notes">
                <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors h-full">
                  <div className="bg-hearlink-50 p-3 rounded-full inline-block mb-3">
                    <BookOpen className="h-6 w-6 text-hearlink-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Study Notes</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Access your saved and generated notes
                  </p>
                </div>
              </Link>
              <Link to="/voice-recorder">
                <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors h-full">
                  <div className="bg-hearlink-50 p-3 rounded-full inline-block mb-3">
                    <Mic className="h-6 w-6 text-hearlink-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Emotion Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Analyse your emotional presence in the classroom.
                  </p>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Courses */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                      <Link to="/student-courses">
                        <Button variant="outline" className="border-hearlink-200 text-hearlink-700">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {courses.map((course) => (
                          <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-hearlink-500 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-gray-900">{course.name}</h3>
                              <span className="text-sm bg-hearlink-50 text-hearlink-700 py-1 px-3 rounded-full">
                            {course.progress}% Complete
                          </span>
                            </div>
                            <p className="text-gray-500 text-sm">{course.teacher}</p>
                            <div className="mt-3 bg-gray-200 rounded-full h-2">
                              <div
                                  className="bg-hearlink-600 rounded-full h-2"
                                  style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex mt-4">
                              <Button variant="outline" className="text-xs h-8 mr-2 border-hearlink-200">
                                Materials
                              </Button>
                              <Button variant="outline" className="text-xs h-8 border-hearlink-200">
                                Assignments
                              </Button>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assignments */}
                <div className="bg-white rounded-lg shadow mt-6">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">Pending Assignments</h2>
                      <Link to="/student-assignments">
                        <Button variant="outline" className="border-hearlink-200 text-hearlink-700">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                          <div key={assignment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                              <p className="text-gray-500 text-sm">{assignment.course}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-red-500">Due {assignment.due}</div>
                              <div className="text-xs text-gray-500 mt-1">{assignment.status}</div>
                            </div>
                          </div>
                      ))}
                    </div>
                    {assignments.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No pending assignments</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                {/* Upcoming Classes */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                          <div key={cls.id} className="flex items-center">
                            <div className="bg-hearlink-100 text-hearlink-700 rounded-lg p-3 mr-4">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{cls.name}</p>
                              <p className="text-sm text-gray-500">
                                {cls.time} • {cls.date}
                              </p>
                            </div>
                          </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link to="/student-calendar" className="text-hearlink-600 hover:underline text-sm font-medium">
                        View Full Calendar
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Discussion Groups */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Study Groups</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-hearlink-100 text-hearlink-700 rounded-lg p-3 mr-4">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Noobuild Community</p>
                          <p className="text-xs text-gray-500">12 members • 3 online</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-hearlink-100 text-hearlink-700 rounded-lg p-3 mr-4">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">AIML Discussion</p>
                          <p className="text-xs text-gray-500">8 members • 1 online</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full border-hearlink-200">
                        Create Study Group
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Learning Progress</h2>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
                        <span className="text-sm font-medium text-hearlink-700">70%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-hearlink-600 rounded-full h-2" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Assignments</span>
                        <span className="text-sm font-medium text-hearlink-700">85%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-hearlink-600 rounded-full h-2" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Course Completion</span>
                        <span className="text-sm font-medium text-hearlink-700">62%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-hearlink-600 rounded-full h-2" style={{ width: "62%" }}></div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Link to="/learning-analytics" className="text-hearlink-600 hover:underline text-sm font-medium">
                        View Detailed Analytics
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StudentDashboard;
