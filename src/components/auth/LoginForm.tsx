import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  userType: "student" | "teacher";
}
const BASE_URL = 'https://ecc0-116-204-174-95.ngrok-free.app';

const LoginForm = ({ userType }: LoginFormProps) => {
  const [username, setUsername] = useState(""); // Only username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const generateHeaders = () => {
      const headers: Record<string, string> = {};
      if (BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }
      return headers;
    };
    // Hardcoded teacher login logic
    if (userType === "teacher" && username === "teacher" && password === "teacher") {
      // Redirect directly to teacher dashboard
      navigate("/teacher-dashboard");
      setIsLoading(false);
      return;
    }

    // For student login, proceed with API call
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...generateHeaders(),
        },

        body: JSON.stringify({
          username: username, // Only send username, no email
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Parsed login data:", data);
      if (!response.ok) {
        alert(data.error || "Login failed");
      } else {
        // Store the username in localStorage
        localStorage.setItem("username", data.username);
        localStorage.setItem("student_id", data.student_id);

        // Redirect user to their dashboard based on userType
        const dashboardPath = userType === "student" ? "/student-dashboard" : "/teacher-dashboard";
        navigate(dashboardPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
              placeholder="Enter your username"
              required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="/forgot-password" className="text-sm text-hearlink-600 hover:text-hearlink-700">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hearlink-500 focus:border-hearlink-500"
                placeholder="••••••••"
                required
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={toggleShowPassword}
            >
              {showPassword ? (
                  <EyeOff className="h-5 w-5" />
              ) : (
                  <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <Button
            type="submit"
            className="w-full bg-hearlink-600 hover:bg-hearlink-700"
            disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
  );
};

export default LoginForm;
