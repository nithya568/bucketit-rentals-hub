
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
