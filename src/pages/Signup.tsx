
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-hearlink-50 to-blue-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-hearlink-600 py-6 text-white text-center">
          <h1 className="text-2xl font-bold">Join HearLink</h1>
          <p className="mt-2">Choose your account type to get started</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="bg-hearlink-50 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-hearlink-100 rounded-full">
                <svg className="h-10 w-10 text-hearlink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">I'm a Student</h2>
            <p className="text-muted-foreground mb-6">
              Create an account to access learning tools designed for hearing-impaired students
            </p>
            <Link to="/signup-student">
              <Button className="w-full bg-hearlink-600 hover:bg-hearlink-700">
                Sign up as Student
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login-student" className="text-hearlink-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
          
          <div className="bg-hearlink-50 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-hearlink-100 rounded-full">
                <svg className="h-10 w-10 text-hearlink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">I'm a Teacher</h2>
            <p className="text-muted-foreground mb-6">
              Create an account to manage classes and create inclusive learning experiences
            </p>
            <Link to="/signup-teacher">
              <Button className="w-full bg-hearlink-600 hover:bg-hearlink-700">
                Sign up as Teacher
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login-teacher" className="text-hearlink-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 text-center">
          <Link to="/" className="text-hearlink-600 hover:text-hearlink-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
