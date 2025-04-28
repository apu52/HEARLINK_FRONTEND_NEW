
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginStudent = () => {
  return (
    <AuthLayout
      title="Student Login"
      subtitle="Welcome back! Log in to continue your learning journey"
      type="login"
      userType="student"
    >
      <LoginForm userType="student" />
    </AuthLayout>
  );
};

export default LoginStudent;
