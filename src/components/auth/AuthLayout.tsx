
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
  userType: "student" | "teacher";
}

const AuthLayout = ({ children, title, subtitle, type, userType }: AuthLayoutProps) => {
  const otherUserType = userType === "student" ? "teacher" : "student";
  const otherUserTypePath = `/${type}-${otherUserType}`;
  const homePath = "/";

  // Dynamic background based on user type
  const bgImage = userType === "student"
    ? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="min-h-screen flex">
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Link to={homePath} className="inline-block mb-8">
            <div className="flex items-center">
              <img src="images\Hearlink.png" alt="HearLink Logo" className="h-10 w-auto" />
              <span className="ml-2 text-2xl font-bold text-hearlink-900">HearLink</span>
            </div>
          </Link>
          
          <h1 className="text-3xl font-bold mb-2 text-hearlink-900">{title}</h1>
          <p className="text-muted-foreground mb-8">{subtitle}</p>

          {children}

          <div className="mt-8">
            {type === "login" ? (
              <p className="text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link to={`/signup-${userType}`} className="text-hearlink-600 hover:text-hearlink-700">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                Already have an account?{" "}
                <Link to={`/login-${userType}`} className="text-hearlink-600 hover:text-hearlink-700">
                  Log in
                </Link>
              </p>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {userType === "student" ? "Are you a teacher?" : "Are you a student?"}
            </p>
            <Link 
              to={otherUserTypePath} 
              className="text-sm font-medium text-hearlink-600 hover:text-hearlink-700"
            >
              {type === "login" ? `Log in` : `Sign up`} as {otherUserType}
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="h-full w-full bg-hearlink-900/30 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="max-w-md text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              {userType === "student" 
                ? "Learn Without Barriers" 
                : "Teach With Greater Impact"}
            </h2>
            <p className="text-lg text-white/90">
              {userType === "student"
                ? "HearLink helps you overcome hearing challenges with cutting-edge technology that makes every classroom accessible."
                : "HearLink provides powerful tools to make your teaching more inclusive and effective for all students."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
