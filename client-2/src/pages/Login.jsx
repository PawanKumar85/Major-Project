import Template from "../components/core/Auth/Template";

function Login() {
  const loginImg =
    "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <Template
      title="Welcome Back"
      description1="Gain the skills of today."
      description2=" Master the tools of tomorrow. Secure your future."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
