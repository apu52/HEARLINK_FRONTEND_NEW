import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Book, 
  Calendar as CalendarIcon, 
  Headphones, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentCalendar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "month", "week", "day"

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate days for the current month view
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ 
        day: i, 
        date: date,
        events: getEventsForDate(date)
      });
    }
    
    return days;
  };

  // Navigate to previous or next month
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Introduction to Networks",
      type: "Lecture",
      date: new Date(2025, 3, 28, 9, 0), // April 28, 2025, 9:00 AM
      endDate: new Date(2025, 3, 28, 10, 30),
      location: "Room 203, Engineering Building",
      instructor: "Prof. David Lee",
      important: false,
      description: "Lecture on network topologies and protocols"
    },
    {
      id: 2,
      title: "Database & Management System",
      type: "Lecture",
      date: new Date(2025, 3, 28, 14, 0), // April 28, 2025, 2:00 PM
      endDate: new Date(2025, 3, 28, 15, 30),
      location: "Room 105, Computer Science Building",
      instructor: "Dr. Emily Torres",
      important: false,
      description: "Covering SQL queries and database normalization"
    },
    {
      id: 3,
      title: "Automata 101",
      type: "Lab",
      date: new Date(2025, 3, 29, 11, 0), // April 29, 2025, 11:00 AM
      endDate: new Date(2025, 3, 29, 13, 0),
      location: "Lab 301, Computer Science Building",
      instructor: "Dr. Sarah Johnson",
      important: false,
      description: "Practical session on implementing finite automata"
    },
    {
      id: 4,
      title: "Advanced Algorithms",
      type: "Quiz",
      date: new Date(2025, 3, 30, 10, 0), // April 30, 2025, 10:00 AM
      endDate: new Date(2025, 3, 30, 11, 0),
      location: "Room 204, Engineering Building",
      instructor: "Prof. Robert Chen",
      important: true,
      description: "Quiz on dynamic programming"
    },
    {
      id: 5,
      title: "Image Processing",
      type: "Lecture",
      date: new Date(2025, 4, 1, 13, 0), // May 1, 2025, 1:00 PM
      endDate: new Date(2025, 4, 1, 14, 30),
      location: "Room 207, Science Building",
      instructor: "Prof. Michael Wong",
      important: false,
      description: "Introduction to image filtering techniques"
    },
    {
      id: 6,
      title: "Research Methodology",
      type: "Assignment Due",
      date: new Date(2025, 4, 2, 23, 59), // May 2, 2025, 11:59 PM
      endDate: new Date(2025, 4, 2, 23, 59),
      location: "Online Submission",
      instructor: "Dr. Amanda Lewis",
      important: true,
      description: "Final research proposal submission"
    },
    {
      id: 7,
      title: "Algorithm Study Group",
      type: "Group Meeting",
      date: new Date(2025, 3, 29, 18, 0), // April 29, 2025, 6:00 PM
      endDate: new Date(2025, 3, 29, 20, 0),
      location: "Library Conference Room 3",
      instructor: null,
      important: false,
      description: "Preparation for the upcoming quiz"
    }
  ];

  // Get events for a specific date
  const getEventsForDate = (date) => {
    if (!date) return [];
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for today
  const todaysEvents = getEventsForDate(new Date());
  
  // Get upcoming events (next 7 days excluding today)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate > today && eventDate <= nextWeek;
    }).sort((a, b) => a.date - b.date);
  };
  
  const upcomingEvents = getUpcomingEvents();

  // Handle date selection
  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Check if a date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Format time (e.g., "9:00 AM")
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Format date (e.g., "Monday, April 28")
  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Days of the week
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Selected date events
  const selectedDateEvents = getEventsForDate(selectedDate);

  const days = getDaysInMonth(currentDate);

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
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Book className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>My Courses</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/student-calendar"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-hearlink-900 bg-hearlink-50"
              >
                <CalendarIcon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
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
        <header className="bg-white shadow-sm flex justify-between items-center py-4 px-6">
  <div className="flex items-center">
    <button
      onClick={toggleSidebar}
      className={`p-1 rounded-full hover:bg-gray-200 ${!collapsed ? "hidden" : ""}`}
    >
      <ChevronRight className="h-5 w-5" />
    </button>
    <h1 className="text-xl font-semibold text-gray-800 ml-2">My Calendar</h1>
  </div>
  <div className="flex items-center space-x-4">
    <div className="relative">
      <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-transparent"
      />
    </div>
    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
      <Bell className="h-5 w-5" />
      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
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

{/* Calendar Content */}
<main className="flex-1 overflow-auto bg-gray-100 p-6">
  <div className="bg-white rounded-lg shadow-sm mb-6">
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex space-x-2">
        <button 
          onClick={() => setViewMode("month")} 
          className={`px-3 py-1 rounded-md ${viewMode === "month" ? "bg-hearlink-100 text-hearlink-800" : "bg-gray-100 text-gray-700"}`}
        >
          Month
        </button>
        <button 
          onClick={() => setViewMode("week")} 
          className={`px-3 py-1 rounded-md ${viewMode === "week" ? "bg-hearlink-100 text-hearlink-800" : "bg-gray-100 text-gray-700"}`}
        >
          Week
        </button>
        <button 
          onClick={() => setViewMode("day")} 
          className={`px-3 py-1 rounded-md ${viewMode === "day" ? "bg-hearlink-100 text-hearlink-800" : "bg-gray-100 text-gray-700"}`}
        >
          Day
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigateMonth('prev')} 
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-medium">{currentMonth} {currentYear}</h2>
        <button 
          onClick={() => navigateMonth('next')} 
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <button className="flex items-center px-3 py-1 bg-hearlink-500 text-white rounded-md hover:bg-hearlink-600">
        <Plus className="h-4 w-4 mr-1" />
        Add Event
      </button>
    </div>

    <div className="p-4">
      {viewMode === "month" && (
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`min-h-24 p-1 border border-gray-100 ${
                isToday(day.date) ? "bg-hearlink-50" : ""
              } ${
                isSelected(day.date) ? "ring-2 ring-hearlink-500" : ""
              } ${
                day.day ? "hover:bg-gray-50 cursor-pointer" : "bg-gray-50"
              }`}
              onClick={() => day.day && handleDateClick(day.date)}
            >
              {day.day && (
                <>
                  <div className="text-right mb-1">
                    <span className={`text-sm inline-block rounded-full w-6 h-6 text-center leading-6 ${
                      isToday(day.date) ? "bg-hearlink-500 text-white" : "text-gray-700"
                    }`}>
                      {day.day}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {day.events && day.events.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        className={`text-xs truncate rounded px-1 py-0.5 ${
                          event.important ? "bg-red-100 text-red-800" : 
                          event.type === "Lecture" ? "bg-blue-100 text-blue-800" : 
                          event.type === "Lab" ? "bg-green-100 text-green-800" : 
                          event.type === "Quiz" ? "bg-purple-100 text-purple-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {formatTime(event.date)} {event.title}
                      </div>
                    ))}
                    {day.events && day.events.length > 3 && (
                      <div className="text-xs text-gray-500 pl-1">
                        +{day.events.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Today's Events */}
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Today's Events</h3>
        <p className="text-sm text-gray-500">{formatDate(new Date())}</p>
      </div>
      <div className="p-4">
        {todaysEvents.length > 0 ? (
          <div className="space-y-4">
            {todaysEvents.map(event => (
              <div key={event.id} className="flex">
                <div className="mr-4">
                  <div className="text-sm font-medium">{formatTime(event.date)}</div>
                  <div className="text-sm text-gray-500">{formatTime(event.endDate)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      event.important ? "bg-red-500" : 
                      event.type === "Lecture" ? "bg-blue-500" : 
                      event.type === "Lab" ? "bg-green-500" : 
                      event.type === "Quiz" ? "bg-purple-500" : 
                      "bg-gray-500"
                    }`}></div>
                    <h4 className="text-sm font-medium">{event.title}</h4>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{event.type}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  {event.instructor && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {event.instructor}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-2">
              <Clock className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-gray-500">No events scheduled for today</p>
          </div>
        )}
      </div>
    </div>

    {/* Selected Date Events */}
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Selected Date</h3>
        <p className="text-sm text-gray-500">{formatDate(selectedDate)}</p>
      </div>
      <div className="p-4">
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedDateEvents.map(event => (
              <div key={event.id} className="border-l-4 pl-3 py-1 border-hearlink-500">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{event.title}</h4>
                  {event.important && (
                    <div className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Important
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{event.type}</div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(event.date)} - {formatTime(event.endDate)}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-2">
              <CalendarIcon className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-gray-500">No events for selected date</p>
          </div>
        )}
      </div>
    </div>

    {/* Upcoming Events */}
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Upcoming Events</h3>
        <p className="text-sm text-gray-500">Next 7 days</p>
      </div>
      <div className="p-4">
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 w-12 h-12 bg-hearlink-100 rounded-lg flex flex-col items-center justify-center mr-3">
                  <span className="text-xs font-medium text-hearlink-800">
                    {event.date.toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-lg font-bold text-hearlink-800">
                    {event.date.getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    {event.important && (
                      <AlertCircle className="h-3 w-3 ml-1 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(event.date)}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  event.type === "Lecture" ? "bg-blue-100 text-blue-800" : 
                  event.type === "Lab" ? "bg-green-100 text-green-800" : 
                  event.type === "Quiz" ? "bg-purple-100 text-purple-800" :
                  event.type === "Assignment Due" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-2">
              <CalendarIcon className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-gray-500">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  </div>
</main>
      </div>
    </div>
  );
};

export default StudentCalendar;