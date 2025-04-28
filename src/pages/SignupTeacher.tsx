
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const SignupTeacher = () => {
  return (
    <AuthLayout
      title="Create Teacher Account"
      subtitle="Sign up to access tools for inclusive education and student management"
      type="signup"
      userType="teacher"
    >
      <SignupForm userType="teacher" />
    </AuthLayout>
  );
};

export default SignupTeacher;
