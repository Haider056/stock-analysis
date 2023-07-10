import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import './register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/opers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        alert('Your ID has been created');
        console.log('User created successfully');
      } else {
        alert('Registration failed!');
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error state or display an error message to the user
    }




 
    console.log('Register submitted', email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Register</h2>
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
          <Button type="submit" className="btn btn-primary btn-center">
            Register
          </Button>
          <p className="login-text">
            Already a member? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
