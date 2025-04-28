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
  FolderPlus,
  UploadCloud,
  Grid,
  List,
  File,
  FileText,
  FileImage,
  Video,
  FilePlus,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Filter,
  MessageSquare,
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TeacherMaterials = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [selectedFolder, setSelectedFolder] = useState("all"); // "all", "documents", "images", "videos"

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Sample materials data
  const materials = [
    { 
      id: 1, 
      name: "Physics 101 Syllabus.pdf", 
      type: "document", 
      size: "245 KB", 
      date: "Apr 15, 2025", 
      class: "Physics 101",
      starred: true,
      icon: <FileText className="h-10 w-10 text-hearlink-600" />
    },
    { 
      id: 2, 
      name: "Introduction to Forces.pptx", 
      type: "document", 
      size: "3.2 MB", 
      date: "Apr 12, 2025", 
      class: "Introduction to Physical Science",
      starred: true,
      icon: <FileText className="h-10 w-10 text-hearlink-600" />
    },
    { 
      id: 3, 
      name: "Lab Equipment Diagram.jpg", 
      type: "image", 
      size: "1.8 MB", 
      date: "Apr 10, 2025", 
      class: "Physics 101",
      starred: false,
      icon: <FileImage className="h-10 w-10 text-green-500" />
    },
    { 
      id: 4, 
      name: "Wave Motion Demonstration.mp4", 
      type: "video", 
      size: "18.5 MB", 
      date: "Apr 08, 2025", 
      class: "Advanced Physics",
      starred: false,
      icon: <Video className="h-10 w-10 text-purple-500" />
    },
    { 
      id: 5, 
      name: "Quantum Physics Notes.pdf", 
      type: "document", 
      size: "1.2 MB", 
      date: "Apr 05, 2025", 
      class: "Quantum Mechanics",
      starred: false,
      icon: <FileText className="h-10 w-10 text-hearlink-600" />
    },
    { 
      id: 6, 
      name: "Electricity and Magnetism Quiz.docx", 
      type: "document", 
      size: "345 KB", 
      date: "Apr 03, 2025", 
      class: "Introduction to Electronics",
      starred: true,
      icon: <FileText className="h-10 w-10 text-hearlink-600" />
    },
    { 
      id: 7, 
      name: "Physics Lab Safety Rules.pdf", 
      type: "document", 
      size: "520 KB", 
      date: "Mar 28, 2025", 
      class: "Physics 101",
      starred: false,
      icon: <FileText className="h-10 w-10 text-hearlink-600" />
    },
    { 
      id: 8, 
      name: "Experimental Setup.jpg", 
      type: "image", 
      size: "2.4 MB", 
      date: "Mar 25, 2025", 
      class: "Advanced Physics",
      starred: false,
      icon: <FileImage className="h-10 w-10 text-green-500" />
    },
    { 
      id: 9, 
      name: "Lecture on Thermodynamics.mp4", 
      type: "video", 
      size: "24.8 MB", 
      date: "Mar 22, 2025", 
      class: "Physics 101",
      starred: true,
      icon: <Video className="h-10 w-10 text-purple-500" />
    },
  ];

  // Filter materials based on selected folder
  const filteredMaterials = selectedFolder === "all" 
    ? materials 
    : materials.filter(material => material.type === selectedFolder);

  // Storage usage data
  const storageData = [
    { type: "Documents", size: "45 MB", color: "bg-hearlink-600", percentage: 45 },
    { type: "Images", size: "15 MB", color: "bg-green-500", percentage: 15 },
    { type: "Videos", size: "35 MB", color: "bg-purple-500", percentage: 35 },
    { type: "Other", size: "5 MB", color: "bg-gray-400", percentage: 5 },
  ];

  // Recently accessed classes
  const recentClasses = [
    { name: "Physics 101", color: "bg-hearlink-600" },
    { name: "Introduction to Physical Science", color: "bg-green-500" },
    { name: "Advanced Physics", color: "bg-purple-500" },
    { name: "Quantum Mechanics", color: "bg-amber-500" },
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
                  to="/Classes"
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
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-full hover:bg-gray-200 md:hidden"
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Teaching Materials</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search Materials..."
                              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hearlink-500"
                            />
                          </div>
                        </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
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
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          {/* Action bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <Button variant="default" className="bg-hearlink-600 hover:bg-hearlink-700">
                <Plus className="h-4 w-4 mr-2" /> New Material
              </Button>
              <Button variant="outline" className="border-gray-300">
                <FolderPlus className="h-4 w-4 mr-2" /> New Folder
              </Button>
              <Button variant="outline" className="border-gray-300">
                <UploadCloud className="h-4 w-4 mr-2" /> Upload
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg bg-white p-1">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded ${
                    viewType === "grid" ? "bg-gray-200 text-hearlink-600" : "text-gray-500"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded ${
                    viewType === "list" ? "bg-gray-200 text-hearlink-600" : "text-gray-500"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <Button variant="outline" className="border-gray-300">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          {/* Folder tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 border-b border-gray-200">
              <button
                onClick={() => setSelectedFolder("all")}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  selectedFolder === "all"
                    ? "text-hearlink-600 border-b-2 border-hearlink-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All Materials
              </button>
              <button
                onClick={() => setSelectedFolder("document")}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  selectedFolder === "document"
                    ? "text-hearlink-600 border-b-2 border-hearlink-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setSelectedFolder("image")}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  selectedFolder === "image"
                    ? "text-hearlink-600 border-b-2 border-hearlink-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setSelectedFolder("video")}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  selectedFolder === "video"
                    ? "text-hearlink-600 border-b-2 border-hearlink-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Materials grid/list view */}
          <div className="mb-8">
            {viewType === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredMaterials.map(material => (
                  <div
                    key={material.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 flex flex-col items-center">
                      {material.icon}
                      <h3 className="mt-3 text-sm font-medium text-gray-800 text-center line-clamp-1">
                        {material.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{material.size}</p>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{material.date}</span>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Modified
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMaterials.map(material => (
                      <tr key={material.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              {material.icon}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{material.name}</div>
                              <div className="text-sm text-gray-500">{material.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{material.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{material.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{material.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Storage and Recent Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Storage Usage */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Storage Usage</h2>
              <div className="mb-4">
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  {storageData.map((item, index) => (
                    <div
                      key={index}
                      className={`h-full ${item.color}`}
                      style={{
                        width: `${item.percentage}%`,
                        float: "left",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {storageData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`h-3 w-3 ${item.color} rounded-full mr-2`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.type}</p>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">100 MB</span> used of{" "}
                  <span className="font-medium">1 GB</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Upgrade storage to increase your limit
                </p>
              </div>
            </div>

            {/* Recent Classes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Accessed Classes</h2>
              <div className="space-y-4">
                {recentClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 ${classItem.color} rounded-lg flex items-center justify-center text-white`}
                      >
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">{classItem.name}</h3>
                        <p className="text-xs text-gray-500">5 materials</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-hearlink-600 rounded-full hover:bg-gray-100">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-hearlink-600 text-sm font-medium hover:text-hearlink-700 flex items-center">
                View all classes <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherMaterials;