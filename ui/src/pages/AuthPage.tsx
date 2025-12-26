import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/ui/auth/AuthCard";
import { RegisterForm } from "@/components/ui/auth/RegisterForm";
import { LoginForm } from "@/components/ui/auth/LoginForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthCard title={isLogin ? "Welcome Back" : "Create Account"}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="text-center mt-4">
        <Button
          variant="ghost"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
        </Button>
      </div>
    </AuthCard>
  );
}
