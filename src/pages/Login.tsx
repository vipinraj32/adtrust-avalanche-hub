import React from "react";

const Login = () => {
  const API_URL = "http://localhost:8082"; // Spring Boot backend

  return (
    <div className="flex flex-col items-center mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <a
        href={`${API_URL}/oauth2/authorization/facebook`}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Login with Facebook
      </a>
      <a
        href={`${API_URL}/oauth2/authorization/instagram`}
        className="px-4 py-2 bg-pink-500 text-white rounded-lg"
      >
        Login with Instagram
      </a>
    </div>
  );
};

export default Login;
