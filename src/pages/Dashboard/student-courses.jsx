import React, { useState } from "react";
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
  Filter,
  ChevronDown,
  Star,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Courses");
  const [showFilters, setShowFilters] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const filters = ["All Courses", "In Progress", "Completed", "Not Started"];

  const courses = [
    { 
      id: 1, 
      name: "Introduction to Networks", 
      teacher: "Prof. David Lee", 
      progress: 65,
      department: "Computer Science",
      credits: 4,
      favorite: true,
      notifications: 2,
      status: "In Progress",
      description: "This course provides an introduction to computer networks, focusing on the concepts, architectures, protocols, and technologies that enable communication over the internet."
    },
    { 
      id: 2, 
      name: "Automata 101", 
      teacher: "Dr. Sarah Johnson", 
      progress: 42,
      department: "Computer Science",
      credits: 3,
      favorite: false,
      notifications: 0,
      status: "In Progress",
      description: "An introductory course to the theory of computation, covering finite automata, regular expressions, context-free grammars, and Turing machines."
    },
    { 
      id: 3, 
      name: "Advanced Algorithms", 
      teacher: "Prof. Robert Chen", 
      progress: 78,
      department: "Computer Science",
      credits: 4,
      favorite: true,
      notifications: 1,
      status: "In Progress",
      description: "This course covers advanced algorithmic techniques including dynamic programming, greedy algorithms, divide and conquer, and graph algorithms."
    },
    { 
      id: 4, 
      name: "Database & Management Systems", 
      teacher: "Dr. Emily Torres", 
      progress: 100,
      department: "Information Technology",
      credits: 4,
      favorite: false,
      notifications: 0,
      status: "Completed",
      description: "An in-depth study of database systems design, implementation, and management, covering relational algebra, SQL, and database architecture."
    },
    { 
      id: 5, 
      name: "Image Processing", 
      teacher: "Prof. Michael Wong", 
      progress: 32,
      department: "Computer Science",
      credits: 3,
      favorite: false,
      notifications: 1,
      status: "In Progress",
      description: "Learn about digital image processing techniques including filtering, enhancement, segmentation, and feature extraction."
    },
    { 
      id: 6, 
      name: "Research Methodology", 
      teacher: "Dr. Amanda Lewis", 
      progress: 0,
      department: "General Studies",
      credits: 2,
      favorite: false,
      notifications: 0,
      status: "Not Started",
      description: "A course on scientific research methods, covering experimental design, data collection, analysis, and academic writing."
    },
  ];

  const filteredCourses = selectedFilter === "All Courses" 
    ? courses 
    : courses.filter(course => course.status === selectedFilter);

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
                to="/student-dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/student-courses"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-hearlink-900 bg-hearlink-50"
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
                placeholder="Search courses..."
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Michael Rodriguez</p>
                <p className="text-xs text-gray-500">Computer Science Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <div className="flex space-x-3">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center border-hearlink-200"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedFilter}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      {filters.map((filter) => (
                        <li 
                          key={filter}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-hearlink-50 ${selectedFilter === filter ? 'bg-hearlink-50 text-hearlink-700' : ''}`}
                          onClick={() => {
                            setSelectedFilter(filter);
                            setShowFilters(false);
                          }}
                        >
                          {filter}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button className="bg-hearlink-600 hover:bg-hearlink-700">
                Browse Courses
              </Button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-hearlink-500 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 flex-1">{course.name}</h3>
                    <button className="text-gray-400 hover:text-yellow-500">
                      <Star className={`h-5 w-5 ${course.favorite ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{course.teacher}</p>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{course.department}</span>
                    <span className="ml-2 bg-gray-100 px-2 py-1 rounded">{course.credits} Credits</span>
                    <span className={`ml-2 px-2 py-1 rounded ${
                        course.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        course.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Progress</span>
                      <span className="text-xs font-medium text-hearlink-700">{course.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`rounded-full h-2 ${
                          course.progress === 100 ? 'bg-green-600' : 'bg-hearlink-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs h-8 border-hearlink-200">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Materials
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-8 border-hearlink-200">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Discussions
                    </Button>
                  </div>
                  {course.notifications > 0 && (
                    <div className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                      {course.notifications} New
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="text-gray-500 mt-2">
                There are no courses matching your current filter.
              </p>
              <Button className="mt-4 bg-hearlink-600 hover:bg-hearlink-700">
                Browse Available Courses
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;