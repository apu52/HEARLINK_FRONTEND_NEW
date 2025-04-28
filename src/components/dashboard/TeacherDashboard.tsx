
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
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
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const classes = [
    { id: 1, name: "Introduction to Physical Science", students: 24, time: "9:00 AM - 10:30 AM", day: "Monday & Wednesday" },
    { id: 2, name: "Physics 101", students: 18, time: "1:00 PM - 2:30 PM", day: "Tuesday & Thursday" },
    { id: 3, name: "Advanced Mathematics", students: 15, time: "11:00 AM - 12:30 PM", day: "Monday & Friday" },
  ];

  const upcomingClasses = [
    { id: 1, name: "Introduction to Physical Science", time: "9:00 AM", date: "Today" },
    { id: 2, name: "Physics 101", time: "1:00 PM", date: "Tomorrow" },
  ];

  const recentActivities = [
    { id: 1, action: "Added new assignment", class: "Introduction to Physics", time: "2 hours ago" },
    { id: 2, action: "Graded assignments", class: "Physics 101", time: "Yesterday" },
    { id: 3, action: "Created new quiz", class: "Advanced Mathematics", time: "2 days ago" },
  ];

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
              <img src="/placeholder.svg" alt="HearLink Logo" className="h-8 w-auto mr-3" />
            )}
            {!collapsed && <span className="text-xl font-bold text-hearlink-900">HearLink</span>}
            {collapsed && <img src="/placeholder.svg" alt="HearLink" className="h-8 w-auto" />}
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
                to="/teacher-dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-hearlink-900 bg-hearlink-50"
              >
                <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Classes"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Users className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Classes</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Calendar"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Calendar className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Calendar</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/teacher-materials"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <BookOpen className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Materials</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/teacher-analytics"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <BarChart className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Analytics</span>}
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
          </ul>
          <div className="border-t border-gray-200 mt-6 pt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/teacher-settings"
                  className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
                >
                  <Settings className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Settings</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                  {!collapsed && <span>Logout</span>}
                </Link>
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Teacher Dashboard</h1>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-hearlink-600 to-hearlink-700 rounded-lg p-6 text-white mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Welcome back, Prof. David!</h2>
                <p className="mb-4">You have 2 classes scheduled for today.</p>
                <Button className="bg-white text-hearlink-600 hover:bg-gray-100">
                  View Schedule
                </Button>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Next Class</div>
                  <div className="text-xl font-bold">Introduction to Biology</div>
                  <div className="text-sm">9:00 AM - 10:30 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Classes</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">3</h3>
                </div>
                <div className="bg-hearlink-50 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-hearlink-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">57</h3>
                </div>
                <div className="bg-hearlink-50 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-hearlink-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Hearing Impaired Students</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">12</h3>
                </div>
                <div className="bg-hearlink-50 p-2 rounded-lg">
                  <Headphones className="h-6 w-6 text-hearlink-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your Classes */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Your Classes</h2>
                    <Button className="bg-hearlink-600 hover:bg-hearlink-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Class
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {classes.map((cls) => (
                      <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:border-hearlink-500 transition-colors">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900">{cls.name}</h3>
                          <span className="text-sm bg-hearlink-50 text-hearlink-700 py-1 px-3 rounded-full">
                            {cls.students} Students
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                          {cls.time} • {cls.day}
                        </p>
                        <div className="flex mt-4 space-x-2">
                          <Button variant="outline" className="text-xs h-8 border-hearlink-200">
                            View Details
                          </Button>
                          <Button variant="outline" className="text-xs h-8 border-hearlink-200">
                            Materials
                          </Button>
                          <Button variant="outline" className="text-xs h-8 border-hearlink-200">
                            Analytics
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/teacher-classes" className="text-hearlink-600 hover:underline text-sm font-medium">
                      View All Classes
                    </Link>
                  </div>
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
                    <Link to="/Calendar" className="text-hearlink-600 hover:underline text-sm font-medium">
                      View Full Calendar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="bg-gray-100 rounded-full p-2 mr-4">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            You {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.class} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/teacher-activities" className="text-hearlink-600 hover:underline text-sm font-medium">
                      View All Activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Teaching Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors">
                <div className="bg-hearlink-50 p-3 inline-block rounded-lg mb-4">
                  <Headphones className="h-6 w-6 text-hearlink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Speech to Text</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Convert your lectures to text in real-time for hearing-impaired students.
                </p>
                <Link to="/speech-to-text" className="text-hearlink-600 hover:underline text-sm font-medium">
                  Learn More
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors">
                <div className="bg-hearlink-50 p-3 inline-block rounded-lg mb-4">
                  <MessageSquare className="h-6 w-6 text-hearlink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Emotion Analysis</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Understand student engagement and emotional responses during lectures.
                </p>
                <Link to="/emotion-analysis" className="text-hearlink-600 hover:underline text-sm font-medium">
                  Learn More
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors">
                <div className="bg-hearlink-50 p-3 inline-block rounded-lg mb-4">
                  <FileText className="h-6 w-6 text-hearlink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Content Generation</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Create accessible educational materials tailored for different learning needs.
                </p>
                <Link to="/content-generation" className="text-hearlink-600 hover:underline text-sm font-medium">
                  Learn More
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:border-hearlink-500 hover:border transition-colors">
                <div className="bg-hearlink-50 p-3 inline-block rounded-lg mb-4">
                  <BarChart className="h-6 w-6 text-hearlink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Track student progress and identify areas for improvement.
                </p>
                <Link to="/analytics" className="text-hearlink-600 hover:underline text-sm font-medium">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
