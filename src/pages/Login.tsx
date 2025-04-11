
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("bucketit_user");
    if (storedUser) {
      // Redirect to profile if already logged in
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
