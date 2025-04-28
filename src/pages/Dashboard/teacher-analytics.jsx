import React, { useState, useEffect } from "react";
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
  PieChart,
  Info,
  AlertCircle,
  Check,
  X,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TeacherAnalytics = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const students = [
    { 
      id: 1, 
      name: "Emma Smith", 
      status: "happy", 
      studentId: "S-2024-001", 
      grade: "10A",
      initials: "ES",
      emotions: {
        engagement: 90,
        focus: 85,
        satisfaction: 95,
        distress: 5,
        confusion: 10
      },
      strengths: [
        "High level of engagement in class discussions",
        "Shows excellent problem-solving skills",
        "Collaborates well with peers during group activities"
      ],
      growthAreas: [
        "Occasionally hesitates to ask questions when confused",
        "Could benefit from more challenging problems"
      ],
      recommendations: [
        "Provide advanced materials for enrichment",
        "Encourage participation in mathematics competitions",
        "Create opportunities for peer tutoring where Emma can help others"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 90, color: "#3B82F6" },
        { name: "Focus", value: 85, color: "#60A5FA" },
        { name: "Satisfaction", value: 95, color: "#93C5FD" },
        { name: "Distress", value: 5, color: "#EF4444" },
        { name: "Confusion", value: 10, color: "#F59E0B" }
      ]
    },
    { 
      id: 2, 
      name: "Michael Johnson", 
      status: "neutral", 
      studentId: "S-2024-002", 
      grade: "10A",
      initials: "MJ",
      emotions: {
        engagement: 75,
        focus: 70,
        satisfaction: 80,
        distress: 15,
        confusion: 25
      },
      strengths: [
        "Participates regularly in class discussions",
        "Shows creativity in problem-solving approaches",
        "Works well independently"
      ],
      growthAreas: [
        "Sometimes loses focus during longer lectures",
        "Hesitates to ask for help when needed",
        "Could improve note-taking skills"
      ],
      recommendations: [
        "Break longer lectures into smaller segments",
        "Check in periodically to ensure understanding",
        "Provide structured note-taking templates"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 75, color: "#3B82F6" },
        { name: "Focus", value: 70, color: "#60A5FA" },
        { name: "Satisfaction", value: 80, color: "#93C5FD" },
        { name: "Distress", value: 15, color: "#EF4444" },
        { name: "Confusion", value: 25, color: "#F59E0B" }
      ]
    },
    { 
      id: 3, 
      name: "Sophia Lee", 
      status: "happy", 
      studentId: "S-2024-003", 
      grade: "10A",
      initials: "SL",
      emotions: {
        engagement: 95,
        focus: 90,
        satisfaction: 95,
        distress: 5,
        confusion: 5
      },
      strengths: [
        "Exceptional focus during lectures",
        "Asks insightful questions",
        "Helps classmates understand difficult concepts"
      ],
      growthAreas: [
        "Could benefit from more social interaction during group work",
        "Sometimes rushes through assignments"
      ],
      recommendations: [
        "Assign leadership roles in group activities",
        "Provide extension activities to maintain engagement",
        "Encourage thorough review of work before submission"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 95, color: "#3B82F6" },
        { name: "Focus", value: 90, color: "#60A5FA" },
        { name: "Satisfaction", value: 95, color: "#93C5FD" },
        { name: "Distress", value: 5, color: "#EF4444" },
        { name: "Confusion", value: 5, color: "#F59E0B" }
      ]
    },
    { 
      id: 4, 
      name: "James Wilson", 
      status: "sad", 
      studentId: "S-2024-004", 
      grade: "10A",
      initials: "JW",
      emotions: {
        engagement: 45,
        focus: 40,
        satisfaction: 50,
        distress: 35,
        confusion: 40
      },
      strengths: [
        "Shows creativity in practical applications",
        "Performs well in hands-on activities",
        "Has strong visual learning preferences"
      ],
      growthAreas: [
        "Struggles to maintain focus during lectures",
        "Shows signs of math anxiety",
        "Low participation in class discussions",
        "Difficulty with abstract concepts"
      ],
      recommendations: [
        "Incorporate more visual and hands-on learning approaches",
        "Schedule one-on-one check-ins to address anxiety",
        "Break complex concepts into smaller, manageable parts",
        "Consider alternative assessment methods"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 45, color: "#3B82F6" },
        { name: "Focus", value: 40, color: "#60A5FA" },
        { name: "Satisfaction", value: 50, color: "#93C5FD" },
        { name: "Distress", value: 35, color: "#EF4444" },
        { name: "Confusion", value: 40, color: "#F59E0B" }
      ]
    },
    { 
      id: 5, 
      name: "Olivia Brown", 
      status: "happy", 
      studentId: "S-2024-005", 
      grade: "10B",
      initials: "OB",
      emotions: {
        engagement: 85,
        focus: 80,
        satisfaction: 90,
        distress: 10,
        confusion: 15
      },
      strengths: [
        "Strong analytical thinking",
        "Excellent written communication",
        "Consistent completion of assignments"
      ],
      growthAreas: [
        "Could participate more in verbal discussions",
        "Sometimes hesitant to take risks with problem-solving"
      ],
      recommendations: [
        "Use written prompts before class discussions",
        "Encourage multiple solution paths for problems",
        "Provide positive reinforcement for verbal participation"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 85, color: "#3B82F6" },
        { name: "Focus", value: 80, color: "#60A5FA" },
        { name: "Satisfaction", value: 90, color: "#93C5FD" },
        { name: "Distress", value: 10, color: "#EF4444" },
        { name: "Confusion", value: 15, color: "#F59E0B" }
      ]
    },
    { 
      id: 6, 
      name: "William Davis", 
      status: "neutral", 
      studentId: "S-2024-006", 
      grade: "10B",
      initials: "WD",
      emotions: {
        engagement: 65,
        focus: 70,
        satisfaction: 75,
        distress: 20,
        confusion: 25
      },
      strengths: [
        "Good teamwork skills",
        "Consistent attendance and punctuality",
        "Responsive to feedback"
      ],
      growthAreas: [
        "Difficulty connecting concepts across units",
        "Inconsistent performance on assessments",
        "Needs improvement in time management"
      ],
      recommendations: [
        "Create concept maps to show relationships between topics",
        "Provide practice tests with targeted feedback",
        "Teach explicit study and time management strategies"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 65, color: "#3B82F6" },
        { name: "Focus", value: 70, color: "#60A5FA" },
        { name: "Satisfaction", value: 75, color: "#93C5FD" },
        { name: "Distress", value: 20, color: "#EF4444" },
        { name: "Confusion", value: 25, color: "#F59E0B" }
      ]
    },
    { 
      id: 7, 
      name: "Ava Martinez", 
      status: "happy", 
      studentId: "S-2024-007", 
      grade: "10B",
      initials: "AM",
      emotions: {
        engagement: 90,
        focus: 85,
        satisfaction: 90,
        distress: 5,
        confusion: 10
      },
      strengths: [
        "Strong problem-solving abilities",
        "Helps peers understand difficult concepts",
        "Takes initiative in learning new material"
      ],
      growthAreas: [
        "Can become frustrated when facing challenges",
        "Occasionally dominates group discussions"
      ],
      recommendations: [
        "Provide strategies for managing frustration",
        "Assign specific roles during group work",
        "Offer challenging extension problems"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 90, color: "#3B82F6" },
        { name: "Focus", value: 85, color: "#60A5FA" },
        { name: "Satisfaction", value: 90, color: "#93C5FD" },
        { name: "Distress", value: 5, color: "#EF4444" },
        { name: "Confusion", value: 10, color: "#F59E0B" }
      ]
    },
    { 
      id: 8, 
      name: "Ethan Taylor", 
      status: "neutral", 
      studentId: "S-2024-008", 
      grade: "10B",
      initials: "ET",
      emotions: {
        engagement: 70,
        focus: 65,
        satisfaction: 75,
        distress: 15,
        confusion: 30
      },
      strengths: [
        "Creative thinking",
        "Strong verbal communication",
        "Enthusiasm for interactive activities"
      ],
      growthAreas: [
        "Note-taking needs improvement",
        "Sometimes misses key details in instructions",
        "Inconsistent homework completion"
      ],
      recommendations: [
        "Provide structured note-taking templates",
        "Use visual checklists for assignment requirements",
        "Implement a homework tracking system with rewards"
      ],
      emotionsDistribution: [
        { name: "Engagement", value: 70, color: "#3B82F6" },
        { name: "Focus", value: 65, color: "#60A5FA" },
        { name: "Satisfaction", value: 75, color: "#93C5FD" },
        { name: "Distress", value: 15, color: "#EF4444" },
        { name: "Confusion", value: 30, color: "#F59E0B" }
      ]
    }
  ];

  const classEmotions = {
    engagement: 78,
    focus: 73,
    satisfaction: 85,
    distress: 10,
    confusion: 15
  };

  const classRecommendations = [
    {
      title: "Minor Adjustments for Improved Student Engagement (3-5% improvement)",
      items: [
        "Increase opportunities for student participation through open-ended questions, think-pair-share activities, or group discussions",
        "Vary instructional strategies including visual aids, hands-on activities, or technology integration",
        "Use positive reinforcement to recognize student achievements, efforts, and progress"
      ]
    },
    {
      title: "Potential Reasons for Discomfort and How to Address Them (2-4% improvement)",
      items: [
        "Overwhelming pace or workload: Adjust assignments and provide regular check-ins",
        "Lack of student autonomy: Offer choices and involve students in decision-making processes",
        "Inadequate emotional support: Check-in with students and validate their feelings"
      ]
    },
    {
      title: "Address Confusion Points (4-6% improvement)",
      items: [
        "Review concepts that show higher confusion rates, particularly abstract algebra concepts",
        "Provide multiple representations of challenging concepts (visual, symbolic, verbal)",
        "Implement quick comprehension checks throughout the lesson"
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "happy": return "bg-green-500";
      case "sad": return "bg-red-500";
      case "neutral": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case "happy": return "Positive";
      case "sad": return "Distressed";
      case "neutral": return "Neutral";
      default: return "Unknown";
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
    
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      
      // Simulate report generation time
      setTimeout(() => {
        setReportGenerated(true);
      }, 500);
    }, 1500);
  };

  // SVG Pie Chart Component
  const PieChartComponent = ({ data, size = 180 }) => {
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;
    
    let total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    const paths = data.map((item, index) => {
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // Convert angles to radians
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      // Calculate arc coordinates
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Determine if we need to use a large arc (1) or a small arc (0)
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Create path for the slice
      const path = `
        M ${centerX} ${centerY}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
      
      currentAngle = endAngle;
      
      return {
        path,
        color: item.color,
        name: item.name,
        value: item.value
      };
    });

    return (
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {paths.map((item, index) => (
            <path 
              key={index} 
              d={item.path} 
              fill={item.color} 
              stroke="#fff" 
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="h-3 w-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
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
            {collapsed && <img src="/api/placeholder/32/32" alt="HearLink" className="h-8 w-auto" />}
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
                    <span className="text-sm text-gray-700">Positive ({students.filter(s => s.status === "happy").length})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Neutral ({students.filter(s => s.status === "neutral").length})</span>
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
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div>
                        <span className="font-medium">Status:</span> {getStatusText(student.status)}
                      </div>
                      <div>
                        <span className="font-medium">Engagement:</span> {student.emotions.engagement}%
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
          <div className="bg-white rounded-lg shadow-md">
            {selectedStudent ? (
              <div>
                <div className="p-4 border-b border-gray-200 bg-blue-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold`}>
                      {selectedStudent.initials}
                    </div>
                    <div>
                    <h2 className="text-xl font-semibold text-blue-800">{selectedStudent.name}</h2>
                      <div className="text-sm text-blue-600">
                        Student ID: {selectedStudent.studentId} | Grade: {selectedStudent.grade} | Emotional Status: {getStatusText(selectedStudent.status)}
                      </div>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${getStatusColor(selectedStudent.status)} text-white`}>
                    {selectedStudent.status === "happy" && <Check className="h-5 w-5" />}
                    {selectedStudent.status === "neutral" && <AlertCircle className="h-5 w-5" />}
                    {selectedStudent.status === "sad" && <X className="h-5 w-5" />}
                  </div>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="bg-blue-50 p-6 rounded-full mb-4">
                        <Loader className="h-12 w-12 text-blue-600 animate-spin" />
                      </div>
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Analyzing Emotional Data</h3>
                      <p className="text-gray-600 text-center max-w-md">
                        AI is processing {selectedStudent.name}'s emotional patterns and preparing personalized teaching recommendations...
                      </p>
                    </div>
                  ) : (
                    <div className={`transition-all duration-500 ${reportGenerated ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Emotional Analysis */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                          <h3 className="text-lg font-medium text-blue-800 mb-3">Emotion Analysis</h3>
                          <p className="text-gray-700 mb-4">
                            {selectedStudent.name} shows {selectedStudent.emotions.engagement}% engagement and {selectedStudent.emotions.satisfaction}% satisfaction in class.
                            {selectedStudent.emotions.distress > 20 
                              ? " There are signs of distress that should be addressed." 
                              : " The emotional patterns indicate a generally positive learning experience."}
                          </p>
                          <div className="flex justify-center mb-2">
                            <PieChartComponent data={selectedStudent.emotionsDistribution} />
                          </div>
                        </div>
                        
                        {/* Strengths and Growth Areas */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                          <h3 className="text-lg font-medium text-blue-800 mb-3">Student Profile</h3>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              Strengths
                            </h4>
                            <ul className="space-y-1 pl-6">
                              {selectedStudent.strengths.map((strength, i) => (
                                <li key={i} className="text-gray-700 text-sm list-disc">
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                              Areas for Growth
                            </h4>
                            <ul className="space-y-1 pl-6">
                              {selectedStudent.growthAreas.map((area, i) => (
                                <li key={i} className="text-gray-700 text-sm list-disc">
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Progress Indicators */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                          <h3 className="text-lg font-medium text-blue-800 mb-3">Emotional Indicators</h3>
                          
                          <div className="space-y-4">
                            {Object.entries(selectedStudent.emotions).map(([emotion, value]) => (
                              <div key={emotion} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium capitalize">{emotion}</span>
                                  <span className="text-sm font-medium">{value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className={`h-2.5 rounded-full ${getBarColor(emotion, value)}`}
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                              <span className="font-medium">Last Updated:</span> Today, 10:45 AM
                            </div>
                            <div className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Data Source:</span> Class Participation & Assignments
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Info className="h-6 w-6 text-blue-700" />
                          </div>
                          <h3 className="text-lg font-medium text-blue-800">AI-Generated Teaching Recommendations</h3>
                        </div>
                        
                        <p className="text-gray-700 mb-5">
                          Based on {selectedStudent.name}'s emotional analysis, here are personalized teaching strategies 
                          to enhance learning experience and emotional well-being:
                        </p>

                        <div className="space-y-4 mb-6">
                          {selectedStudent.recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                              <div className="bg-blue-100 p-1 rounded-lg mr-3 mt-0.5">
                                <Check className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-gray-800">{rec}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                          <div className="text-sm text-blue-700">
                            <span className="font-medium">Expected Improvement:</span> 10-15% in engagement and 5-8% in emotional well-being
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                              Save Report
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Intervention Plan
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Additional Resources */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 flex">
                          <div className="bg-purple-100 p-2 rounded-lg mr-3 h-10">
                            <Headphones className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Learning Style Resources</h4>
                            <p className="text-sm text-gray-600">Access materials that match {selectedStudent.name}'s learning preferences</p>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 flex">
                          <div className="bg-green-100 p-2 rounded-lg mr-3 h-10">
                            <Users className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Group Recommendations</h4>
                            <p className="text-sm text-gray-600">Suggested student pairings for collaborative activities</p>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 flex">
                          <div className="bg-orange-100 p-2 rounded-lg mr-3 h-10">
                            <MessageSquare className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">Communication Tips</h4>
                            <p className="text-sm text-gray-600">Effective ways to provide feedback to {selectedStudent.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Student Selected</h3>
                <p className="text-gray-500 max-w-md">
                  Select a student from the panel above to view their detailed emotion analysis and get personalized teaching recommendations.
                </p>
              </div>
            )}
          </div>

          {/* Class Overview Section (appears below when you scroll) */}
          {selectedStudent && reportGenerated && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Class 10A Emotional Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Class Emotional Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-blue-700 font-bold text-2xl">{classEmotions.engagement}%</div>
                      <div className="text-sm font-medium">Engagement</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-blue-700 font-bold text-2xl">{classEmotions.satisfaction}%</div>
                      <div className="text-sm font-medium">Satisfaction</div>
                    </div>
                    <div className={`${classEmotions.confusion > 20 ? 'bg-red-50' : 'bg-green-50'} p-4 rounded-lg`}>
                      <div className={`${classEmotions.confusion > 20 ? 'text-red-600' : 'text-green-600'} font-bold text-2xl`}>
                        {classEmotions.confusion}%
                      </div>
                      <div className="text-sm font-medium">Confusion</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 mb-3">Student Emotional Distribution</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Positive</span>
                        <span className="text-sm font-medium">{students.filter(s => s.status === "happy").length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(students.filter(s => s.status === "happy").length / students.length) * 100}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Neutral</span>
                        <span className="text-sm font-medium">{students.filter(s => s.status === "neutral").length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(students.filter(s => s.status === "neutral").length / students.length) * 100}%` }}></div>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Distressed</span>
                        <span className="text-sm font-medium">{students.filter(s => s.status === "sad").length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(students.filter(s => s.status === "sad").length / students.length) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Class-wide Recommendations</h3>
                  <div className="space-y-4">
                    {classRecommendations.map((rec, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                        <h4 className="font-medium mb-2 text-blue-800">{rec.title}</h4>
                        <ul className="space-y-2">
                          {rec.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <PieChart className="h-4 w-4 mr-2" />
                      Generate Full Class Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 justify-end">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Schedule Class Intervention
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Export Analytics Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Weekly Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;
                    