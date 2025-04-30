import React, { useState } from "react";
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
  X,
  Clock,
  MapPin,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentCalendar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week"); // "month", "week", "day"
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "class",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    description: "",
    color: "#3b82f6" // Default blue
  });
  const [showDropdown, setShowDropdown] = useState(false);

  // Event types with corresponding colors
  const eventTypes = [
    { name: "Class", value: "class", color: "#3b82f6" }, // Blue
    { name: "Assignment", value: "assignment", color: "#f97316" }, // Orange
    { name: "Exam", value: "exam", color: "#ef4444" }, // Red
    { name: "Viva", value: "viva", color: "#8b5cf6" }, // Purple
    { name: "Practical", value: "practical", color: "#10b981" }, // Green
    { name: "Study Group", value: "study", color: "#6366f1" }, // Indigo
    { name: "Other", value: "other", color: "#6b7280" } // Gray
  ];

  // Sample events data (would normally come from API)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Data Structures Lecture",
      type: "class",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0),
      startTime: "10:00",
      endTime: "11:30",
      location: "Building A, Room 301",
      description: "Chapter 7: Binary Trees",
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Algorithm Analysis Assignment Due",
      type: "assignment",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 23, 59),
      startTime: "23:59",
      endTime: "23:59",
      location: "Online Submission",
      description: "Complete problems 3.1-3.8 in the textbook",
      color: "#f97316"
    },
    {
      id: 3,
      title: "DBMS Midterm Exam",
      type: "exam",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 14, 0),
      startTime: "14:00",
      endTime: "16:00",
      location: "Examination Hall 2",
      description: "Chapters 1-5, closed book",
      color: "#ef4444"
    },
    {
      id: 4,
      title: "Computer Networks Project Viva",
      type: "viva",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2, 13, 0),
      startTime: "13:00",
      endTime: "14:00",
      location: "Professor Chen's Office",
      description: "Be prepared to demonstrate your network simulation",
      color: "#8b5cf6"
    },
    {
      id: 5,
      title: "Digital Electronics Lab",
      type: "practical",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1, 9, 0),
      startTime: "09:00",
      endTime: "12:00",
      location: "Engineering Lab 4",
      description: "Logic Gate Implementation",
      color: "#10b981"
    },
    {
      id: 6,
      title: "AI Study Group",
      type: "study",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 16, 0),
      startTime: "16:00",
      endTime: "18:00",
      location: "Library, Group Study Room 3",
      description: "Review for upcoming quiz on neural networks",
      color: "#6366f1"
    }
  ]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Get days of the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Helper to format date as YYYY-MM-DD for input fields
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // Navigate to previous month/week/day
  const prevPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  // Navigate to next month/week/day
  const nextPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (viewMode === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is the selected date
  const isSelectedDate = (date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Handle form input changes for new events
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "type") {
      const selectedType = eventTypes.find(type => type.value === value);
      setNewEvent({
        ...newEvent,
        [name]: value,
        color: selectedType.color
      });
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value
      });
    }
  };

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (viewMode === "month") {
      setViewMode("day");
      setCurrentDate(date);
    }
  };

  // Add a new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    const eventDate = new Date(newEvent.date);
    
    const newEventObject = {
      id: events.length + 1,
      ...newEvent,
      date: eventDate
    };
    
    setEvents([...events, newEventObject]);
    setShowEventModal(false);
    
    // Reset form
    setNewEvent({
      title: "",
      type: "class",
      date: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      location: "",
      description: "",
      color: "#3b82f6"
    });
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get week dates (Sunday to Saturday)
  const getWeekDates = () => {
    const dates = [];
    const firstDayOfWeek = new Date(currentDate);
    const day = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    firstDayOfWeek.setDate(currentDate.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  // Format time (24h to 12h format)
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // Month view renderer
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Previous month's days
    const prevMonthDays = [];
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const prevMonthDaysCount = prevMonth.getDate();
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = prevMonthDaysCount - firstDayOfMonth + i + 1;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
      prevMonthDays.push({ date, day });
    }
    
    // Current month's days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      currentMonthDays.push({ date, day: i });
    }
    
    // Next month's days
    const nextMonthDays = [];
    const totalCells = 42; // 6 rows x 7 columns
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      nextMonthDays.push({ date, day: i });
    }
    
    // Combine all days
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 gap-0">
          {dayNames.map((day, index) => (
            <div key={index} className="p-2 text-center font-medium text-gray-500 border-b">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {allDays.map(({ date, day }, index) => {
            const dateEvents = getEventsForDate(date);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            
            return (
              <div 
                key={index} 
                className={`h-28 p-1 border hover:bg-blue-50 cursor-pointer transition-colors
                  ${isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'}
                  ${isToday(date) ? 'bg-blue-50' : ''}
                  ${isSelectedDate(date) ? 'border-blue-500 border-2' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <div className="flex justify-between items-center p-1">
                  <span className={`text-sm font-medium ${isToday(date) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                    {day}
                  </span>
                  {dateEvents.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-1.5">
                      {dateEvents.length}
                    </span>
                  )}
                </div>
                <div className="mt-1 space-y-1 max-h-20 overflow-hidden">
                  {dateEvents.slice(0, 3).map((event, idx) => (
                    <div 
                      key={idx} 
                      className="text-xs rounded px-1 py-0.5 truncate"
                      style={{ backgroundColor: `${event.color}20`, color: event.color }}
                    >
                      {event.startTime} - {event.title}
                    </div>
                  ))}
                  {dateEvents.length > 3 && (
                    <div className="text-xs text-gray-500 pl-1">
                      +{dateEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Week view renderer
  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
    
    return (
      <div className="bg-white rounded-lg shadow overflow-auto">
        <div className="flex min-w-max">
          {/* Time column */}
          <div className="w-20 flex-shrink-0">
            <div className="h-16 border-b border-r"></div> {/* Empty corner cell */}
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b border-r text-xs text-gray-500 pl-2 pt-1">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {weekDates.map((date, dateIndex) => {
            const dateEvents = getEventsForDate(date);
            
            return (
              <div key={dateIndex} className="flex-1 min-w-36">
                {/* Day header */}
                <div 
                  className={`h-16 border-b flex flex-col items-center justify-center
                    ${isToday(date) ? 'bg-blue-50' : ''}
                    ${isSelectedDate(date) ? 'border-blue-500 border-b-2' : ''}`}
                  onClick={() => handleDateClick(date)}
                >
                  <div className="text-sm font-medium">{dayNames[date.getDay()].substring(0, 3)}</div>
                  <div className={`text-lg font-bold ${isToday(date) ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center' : ''}`}>
                    {date.getDate()}
                  </div>
                </div>
                
                {/* Hour cells */}
                {hours.map((hour) => {
                  const hourEvents = dateEvents.filter(event => {
                    const eventStartHour = parseInt(event.startTime.split(':')[0]);
                    return eventStartHour === hour;
                  });
                  
                  return (
                    <div key={`${dateIndex}_${hour}`} className="h-16 border-b relative hover:bg-blue-50 cursor-pointer">
                      {hourEvents.map((event, eventIdx) => {
                        const startHour = parseInt(event.startTime.split(':')[0]);
                        const startMinute = parseInt(event.startTime.split(':')[1]);
                        const endHour = parseInt(event.endTime.split(':')[0]);
                        const endMinute = parseInt(event.endTime.split(':')[1]);
                        
                        // Calculate event duration in minutes
                        const durationHours = endHour - startHour;
                        const durationMinutes = endMinute - startMinute;
                        const totalDurationMinutes = durationHours * 60 + durationMinutes;
                        
                        // Calculate height based on duration (1 hour = 64px)
                        const height = (totalDurationMinutes / 60) * 64;
                        
                        // Calculate top position based on start minute
                        const top = (startMinute / 60) * 64;
                        
                        return (
                          <div 
                            key={eventIdx}
                            className="absolute left-0 right-0 mx-1 overflow-hidden rounded text-xs"
                            style={{ 
                              top: `${top}px`, 
                              height: `${height}px`,
                              backgroundColor: event.color,
                              color: 'white',
                              zIndex: 10
                            }}
                          >
                            <div className="p-1 truncate">
                              <div className="font-bold">{event.title}</div>
                              <div>{event.startTime} - {event.endTime}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Day view renderer
  const renderDayView = () => {
    const dateEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
    
    return (
      <div className="bg-white rounded-lg shadow flex flex-col lg:flex-row">
        {/* Time and events */}
        <div className="flex-1 overflow-auto">
          <div className="flex min-w-max">
            {/* Time column */}
            <div className="w-20 flex-shrink-0">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b border-r text-xs text-gray-500 pl-2 pt-1">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>
            
            {/* Events column */}
            <div className="flex-1 min-w-72">
              {hours.map((hour) => {
                const hourEvents = dateEvents.filter(event => {
                  const eventStartHour = parseInt(event.startTime.split(':')[0]);
                  return eventStartHour === hour;
                });
                
                return (
                  <div key={hour} className="h-20 border-b relative hover:bg-blue-50 cursor-pointer">
                    {hourEvents.map((event, eventIdx) => {
                      const startHour = parseInt(event.startTime.split(':')[0]);
                      const startMinute = parseInt(event.startTime.split(':')[1]);
                      const endHour = parseInt(event.endTime.split(':')[0]);
                      const endMinute = parseInt(event.endTime.split(':')[1]);
                      
                      // Calculate event duration in minutes
                      const durationHours = endHour - startHour;
                      const durationMinutes = endMinute - startMinute;
                      const totalDurationMinutes = durationHours * 60 + durationMinutes;
                      
                      // Calculate height based on duration (1 hour = 80px)
                      const height = (totalDurationMinutes / 60) * 80;
                      
                      // Calculate top position based on start minute
                      const top = (startMinute / 60) * 80;
                      
                      return (
                        <div 
                          key={eventIdx}
                          className="absolute left-0 right-0 mx-2 overflow-hidden rounded"
                          style={{ 
                            top: `${top}px`, 
                            height: `${height}px`,
                            backgroundColor: event.color,
                            color: 'white',
                            zIndex: 10
                          }}
                        >
                          <div className="p-2 truncate">
                            <div className="font-bold">{event.title}</div>
                            <div className="text-sm">{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                            {event.location && (
                              <div className="text-sm flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Events list */}
        <div className="lg:w-80 bg-gray-50 p-4 border-l">
          <h3 className="text-lg font-bold mb-4">
            Events for {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {dateEvents.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p>No events scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dateEvents.sort((a, b) => {
                return a.startTime.localeCompare(b.startTime);
              }).map((event, index) => (
                <div 
                  key={index} 
                  className="bg-white p-3 rounded-lg shadow-sm border-l-4"
                  style={{ borderLeftColor: event.color }}
                >
                  <div className="font-bold text-gray-800">{event.title}</div>
                  <div className="text-sm flex items-center text-gray-600 mt-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </div>
                  {event.location && (
                    <div className="text-sm flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                  )}
                  {event.description && (
                    <div className="text-sm text-gray-600 mt-2 border-t pt-2">
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Get a text representation of the current view period
  const getPeriodLabel = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === "week") {
      const weekDates = getWeekDates();
      const firstDay = weekDates[0];
      const lastDay = weekDates[6];
      
      if (firstDay.getMonth() === lastDay.getMonth()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'long' })} ${firstDay.getDate()} - ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
      } else if (firstDay.getFullYear() === lastDay.getFullYear()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'short' })} ${firstDay.getDate()} - ${lastDay.toLocaleDateString('en-US', { month: 'short' })} ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
      } else {
        return `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

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
              <img src="hearlink_new/images/Hearlink.png" alt="HearLink Logo" className="h-8 w-auto mr-3" />
            )}
            {!collapsed && <span className="text-xl font-bold text-hearlink-900">HearLink</span>}
            {collapsed && <img src="hearlink_new\images\Hearlink.png" alt="HearLink" className="h-8 w-auto" />}
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
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Home className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/student-courses"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Book className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>My Courses</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/student-calendar"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-blue-900 bg-blue-50"
              >
                <CalendarIcon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Calendar</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/speech-to-text"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
              >
                <Headphones className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>Speech to Text</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/learning_materials"
                className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
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
                  className="flex items-center p-2 rounded-lg hover:bg-blue-50 text-gray-600"
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
                      <div className="flex-1 overflow-auto">
                        {/* Top Navigation */}
                        <header className="bg-white shadow-sm">
                          <div className="flex justify-between items-center px-6 py-3">
                            <div className="flex items-center">
                              {collapsed && (
                                <button
                                  onClick={toggleSidebar}
                                  className="p-1 rounded-full hover:bg-gray-200 mr-4"
                                >
                                  <ChevronRight className="h-6 w-6" />
                                </button>
                              )}
                              <h1 className="text-xl font-bold text-gray-800">Calendar</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="flex items-center rounded-lg bg-gray-100 px-3 py-2">
                                  <Search className="h-4 w-4 text-gray-500 mr-2" />
                                  <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none focus:outline-none text-sm"
                                  />
                                </div>
                              </div>
                              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
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
                          </div>
                        </header>
                
                        {/* Calendar Content */}
                        <main className="p-6">
                          {/* Calendar Controls */}
                          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={prevPeriod}
                                className="p-2 rounded hover:bg-gray-100"
                              >
                                <ChevronLeft className="h-5 w-5 text-gray-600" />
                              </button>
                              <button
                                onClick={goToToday}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium"
                              >
                                Today
                              </button>
                              <button
                                onClick={nextPeriod}
                                className="p-2 rounded hover:bg-gray-100"
                              >
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                              </button>
                              <h2 className="text-lg font-semibold text-gray-800 ml-2">
                                {getPeriodLabel()}
                              </h2>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <button 
                                  className="flex items-center px-3 py-1.5 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
                                  onClick={() => setShowDropdown(!showDropdown)}
                                >
                                  <span className="text-sm font-medium mr-1">{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}</span>
                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                </button>
                                
                                {showDropdown && (
                                  <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 w-32">
                                    <button 
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${viewMode === 'month' ? 'font-bold text-blue-600' : ''}`}
                                      onClick={() => {
                                        setViewMode('month');
                                        setShowDropdown(false);
                                      }}
                                    >
                                      Month
                                    </button>
                                    <button 
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${viewMode === 'week' ? 'font-bold text-blue-600' : ''}`}
                                      onClick={() => {
                                        setViewMode('week');
                                        setShowDropdown(false);
                                      }}
                                    >
                                      Week
                                    </button>
                                    <button 
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${viewMode === 'day' ? 'font-bold text-blue-600' : ''}`}
                                      onClick={() => {
                                        setViewMode('day');
                                        setShowDropdown(false);
                                      }}
                                    >
                                      Day
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              <Button 
                                onClick={() => setShowEventModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                <span>Add Event</span>
                              </Button>
                            </div>
                          </div>
                
                          {/* Calendar Views */}
                          <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {viewMode === "month" && renderMonthView()}
                            {viewMode === "week" && renderWeekView()}
                            {viewMode === "day" && renderDayView()}
                          </div>
                        </main>
                      </div>
                
                      {/* Add Event Modal */}
                      {showEventModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold">Add New Event</h3>
                              <button 
                                onClick={() => setShowEventModal(false)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <X className="h-5 w-5 text-gray-500" />
                              </button>
                            </div>
                            
                            <form onSubmit={handleAddEvent}>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Title
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter event title"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Type
                                  </label>
                                  <select
                                    name="type"
                                    value={newEvent.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    {eventTypes.map((type) => (
                                      <option key={type.value} value={type.value}>
                                        {type.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    name="date"
                                    value={formatDateForInput(newEvent.date)}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                
                                <div className="flex space-x-4">
                                  <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Start Time
                                    </label>
                                    <input
                                      type="time"
                                      name="startTime"
                                      value={newEvent.startTime}
                                      onChange={handleInputChange}
                                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      End Time
                                    </label>
                                    <input
                                      type="time"
                                      name="endTime"
                                      value={newEvent.endTime}
                                      onChange={handleInputChange}
                                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                  </label>
                                  <input
                                    type="text"
                                    name="location"
                                    value={newEvent.location}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter location (optional)"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                    placeholder="Enter description (optional)"
                                  />
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setShowEventModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                  <Button type="submit">
                                    Create Event
                                  </Button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                };
                
                export default StudentCalendar;
