import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import './Login.css';
import './components/loggedIn'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './App';
import { useContext } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, emaill, login, logout, mailChange } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const url = 'http://127.0.0.1:5000/opers/login';
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Login submitted', email, password);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        alert('Logged In!');
        login();
        mailChange(email);
        navigate('/loggedIn');
      } else {
        alert('Wrong login Credentials');
        console.error('Error creating user');
      }
    } catch (error) {
      alert(error);
      console.error('An error occurred:', error);
      // Handle error state or display an error message to the user
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Login</h2>
        <FormControl
          type="email"
          className="form-input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <FormControl
          type="password"
          className="form-input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div className="form-actions">
          <Button type="submit" className="btn btn-primary">
            Login
          </Button>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
