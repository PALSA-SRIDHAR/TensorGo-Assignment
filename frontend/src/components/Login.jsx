import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login">
      <h2>Login with Google</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;