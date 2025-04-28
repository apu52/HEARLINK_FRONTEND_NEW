import React, { useState } from "react";
import { 
  Home, 
  Users, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  Users as UsersIcon,
  BarChart,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TeacherCalendar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewType, setViewType] = useState("month"); // "month", "week", "day", "agenda"

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Get the number of days in the current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Create calendar days array
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  // Go to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Go to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Sample events
  const events = [
    { id: 1, title: "Introduction to Physical Science", type: "class", time: "9:00 AM - 10:30 AM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 5), color: "bg-hearlink-600" },
    { id: 2, title: "Physics 101", type: "class", time: "1:00 PM - 2:30 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 6), color: "bg-green-500" },
    { id: 3, title: "Faculty Meeting", type: "meeting", time: "3:00 PM - 4:00 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 8), color: "bg-amber-500" },
    { id: 4, title: "Parent-Teacher Conferences", type: "meeting", time: "4:30 PM - 7:00 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 12), color: "bg-purple-500" },
    { id: 5, title: "Advanced Mathematics", type: "class", time: "11:00 AM - 12:30 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15), color: "bg-blue-500" },
    { id: 6, title: "Science Department Meeting", type: "meeting", time: "2:00 PM - 3:00 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 18), color: "bg-amber-500" },
    { id: 7, title: "Physics Exam", type: "exam", time: "10:00 AM - 12:00 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 20), color: "bg-red-500" },
    { id: 8, title: "Professional Development Workshop", type: "workshop", time: "All Day", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25), color: "bg-teal-500" },
    { id: 9, title: "Physics 101", type: "class", time: "1:00 PM - 2:30 PM", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 27), color: "bg-green-500" },
  ];

  // Function to check if a date has events
  const hasEvents = (day) => {
    if (!day) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Function to get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Today's events
  const todayEvents = events.filter(event => 
    event.date.getDate() === new Date().getDate() && 
    event.date.getMonth() === new Date().getMonth() && 
    event.date.getFullYear() === new Date().getFullYear()
  );

  // Upcoming events
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

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
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 text-gray-600"
              >
                <Users className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Classes</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/Calendar"
                className="flex items-center p-2 rounded-lg hover:bg-hearlink-50 bg-hearlink-50 text-hearlink-900"
              >
                <CalendarIcon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
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
                placeholder="Search events..."
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
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Calendar Side Panel */}
            <div className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
              <div className="mb-6">
                <Button className="w-full bg-hearlink-600 hover:bg-hearlink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
              
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">TODAY</h2>
                {todayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todayEvents.map(event => (
                      <div key={event.id} className="bg-hearlink-50 rounded-lg p-3">
                        <div className={`w-2 h-2 ${event.color} rounded-full mb-2`}></div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No events today</p>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">UPCOMING</h2>
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start border-l-2 pl-3" style={{ borderColor: event.color.replace('bg-', 'rgb(') }}>
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Calendar Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button className="bg-hearlink-600 text-white rounded-md px-3 py-1">
                      Today
                    </button>
                    <div className="flex items-center">
                      <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                      </button>
                      <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {getMonthName(currentMonth)} {currentMonth.getFullYear()}
                    </h2>
                  </div>
                  <div className="flex rounded-lg border border-gray-200">
                    <button 
                      className={`px-3 py-1 text-sm ${viewType === 'month' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                      onClick={() => setViewType('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${viewType === 'week' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                      onClick={() => setViewType('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${viewType === 'day' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                      onClick={() => setViewType('day')}
                    >
                      Day
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${viewType === 'agenda' ? 'bg-hearlink-50 text-hearlink-700' : 'text-gray-500'}`}
                      onClick={() => setViewType('agenda')}
                    >
                      Agenda
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-hearlink-50 text-hearlink-700 px-3 py-1 rounded-md text-sm flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-hearlink-600 rounded-full mr-1"></div>
                      <span className="text-xs text-gray-600">Classes</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-amber-500 rounded-full mr-1"></div>
                      <span className="text-xs text-gray-600">Meetings</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-xs text-gray-600">Exams</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-teal-500 rounded-full mr-1"></div>
                      <span className="text-xs text-gray-600">Workshops</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <div key={index} className="bg-gray-100 py-2 text-center text-xs font-semibold text-gray-700">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Cells */}
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {renderCalendarDays().map((day, index) => (
                      <div 
                        key={index} 
                        className={`bg-white min-h-24 p-1 ${
                          day === new Date().getDate() && 
                          currentMonth.getMonth() === new Date().getMonth() && 
                          currentMonth.getFullYear() === new Date().getFullYear() 
                            ? 'ring-2 ring-hearlink-500 ring-inset' 
                            : ''
                        }`}
                      >
                        {day && (
                          <>
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-medium text-gray-700">{day}</span>
                              {hasEvents(day) && (
                                <button className="rounded-full bg-gray-100 p-1 hover:bg-gray-200">
                                  <Plus className="h-3 w-3 text-gray-600" />
                                </button>
                              )}
                            </div>
                            
                            <div className="mt-1 space-y-1">
                              {getEventsForDay(day).map(event => (
                                <div 
                                  key={event.id} 
                                  className={`${event.color} text-white text-xs p-1 rounded truncate`}
                                >
                                  {event.time.split(' ')[0]} {event.title}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
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

export default TeacherCalendar;