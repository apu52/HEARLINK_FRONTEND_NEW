
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginTeacher = () => {
  return (
    <AuthLayout
      title="Teacher Login"
      subtitle="Welcome back! Log in to manage your classes and students"
      type="login"
      userType="teacher"
    >
      <LoginForm userType="teacher" />
    </AuthLayout>
  );
};

export default LoginTeacher;
