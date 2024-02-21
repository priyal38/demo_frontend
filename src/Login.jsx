import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate  = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials , 
      {
        headers:{'Content-Type' : 'application/json'}
        ,withCredentials:true
      }
      )
      const { accessToken, refreshToken } = response.data;
console.log(response);
      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);

      
navigate('/home')
      // Redirect or perform other actions upon successful login
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Username:<input
        type="username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <br />
     Password:<input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

