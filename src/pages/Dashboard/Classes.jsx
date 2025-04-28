import React, { useState } from "react";
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
  Filter,
  MoreVertical, 
  MessageSquare,
  BarChart,
  FileText,
  Headphones,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TeacherClasses = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const classes = [
    { 
      id: 1, 
      name: "Introduction to Physical Science", 
      section: "Section A", 
      students: 24, 
      time: "9:00 AM - 10:30 AM", 
      day: "Monday & Wednesday",
      color: "bg-blue-500",
      image: "/placeholder.svg"
    },
    { 
      id: 2, 
      name: "Physics 101", 
      section: "Section B", 
      students: 18, 
      time: "1:00 PM - 2:30 PM", 
      day: "Tuesday & Thursday",
      color: "bg-green-500",
      image: "/placeholder.svg"
    },
    { 
      id: 3, 
      name: "Advanced Mathematics", 
      section: "Section C", 
      students: 15, 
      time: "11:00 AM - 12:30 PM", 
      day: "Monday & Friday",
      color: "bg-purple-500",
      image: "/placeholder.svg"
    },
    { 
      id: 4, 
      name: "Modern Physics", 
      section: "Section D", 
      students: 22, 
      time: "3:00 PM - 4:30 PM", 
      day: "Wednesday & Friday",
      color: "bg-hearlink-600",
      image: "/placeholder.svg"
    },
    { 
      id: 5, 
      name: "Quantum Mechanics", 
      section: "Section E", 
      students: 12, 
      time: "10:00 AM - 11:30 AM", 
      day: "Tuesday & Thursday",
      color: "bg-amber-500",
      image: "/placeholder.svg"
    },
    { 
      id: 6, 
      name: "Introduction to Electronics", 
      section: "Section F", 
      students: 20, 
      time: "2:00 PM - 3:30 PM", 
      day: "Monday & Wednesday",
      color: "bg-rose-500",
      image: "/placeholder.svg"
    },
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
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/teacher-classes"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 bg-hearlink-50 text-hearlink-900"
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
                placeholder="Search classes..."
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Classes</h1>
            <div className="flex items-center space-x-4">
              <div className="flex rounded-lg border border-gray-200 bg-white">
                <button 
                  className={`px-4 py-2 ${viewType === 'grid' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                  onClick={() => setViewType('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  className={`px-4 py-2 ${viewType === 'list' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                  onClick={() => setViewType('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <Button className="flex items-center bg-hearlink-600 hover:bg-hearlink-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Class
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter</span>
              <select className="ml-4 border-none bg-gray-50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-hearlink-500">
                <option>All Classes</option>
                <option>Active</option>
                <option>Archived</option>
              </select>
              <select className="ml-4 border-none bg-gray-50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-hearlink-500">
                <option>All Subjects</option>
                <option>Physics</option>
                <option>Mathematics</option>
                <option>Electronics</option>
              </select>
            </div>
            <div>
              <select className="border-none bg-gray-50 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-hearlink-500">
                <option>Sort by: Recently Created</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Most Students</option>
              </select>
            </div>
          </div>

          {/* Classes Grid */}
          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-24 ${cls.color} relative`}>
                    <div className="absolute top-4 right-4">
                      <button className="p-1 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                        <MoreVertical className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{cls.name}</h3>
                    <p className="text-gray-500 mb-3">{cls.section}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{cls.students} Students</span>
                      </div>
                      <div>{cls.day}</div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Button variant="outline" className="border-hearlink-200 text-hearlink-700 hover:bg-hearlink-50">
                        Enter Class
                      </Button>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded hover:bg-gray-100">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <BarChart className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {classes.map((cls, index) => (
                <div key={cls.id} className={`p-4 hover:bg-gray-50 flex items-center justify-between ${index !== classes.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${cls.color} text-white flex items-center justify-center font-bold text-lg mr-4`}>
                      {cls.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{cls.name}</h3>
                      <p className="text-sm text-gray-500">{cls.section} • {cls.day} • {cls.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {cls.students} Students
                    </div>
                    <Button variant="outline" className="border-hearlink-200 text-hearlink-700 hover:bg-hearlink-50">
                      Enter Class
                    </Button>
                    <div className="flex">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Archived Classes */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Archived Classes</h2>
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No archived classes</h3>
              <p className="text-gray-500 mb-4">Classes that are no longer active will appear here</p>
              <Button variant="outline" className="border-hearlink-200 text-hearlink-700 hover:bg-hearlink-50">
                View Archived Classes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;