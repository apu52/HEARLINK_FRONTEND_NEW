
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupStudent = () => {
  return (
    <AuthLayout
      title="Create Student Account"
      subtitle="Sign up to access learning tools designed for hearing-impaired students"
      type="signup"
      userType="student"
    >
      <SignupForm userType="student" />
    </AuthLayout>
  );
};

export default SignupStudent;
