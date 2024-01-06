import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState , useContext } from 'react';

import { UserContext } from './UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (username && password) {
      try {
        const response = await axios.get('http://localhost:9081/dukes-data/api/users');
        const user = response.data.find(user => user.email === username && user.password === password);
        if (user) {
          login(user);
          setInvalidCredentials(false);
          
        } else {
          setInvalidCredentials(true);
          
        }
      } catch (error) {
        console.log('Failed to login');
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className={'form-control' + (submitted && !username ? ' is-invalid' : '') + (invalidCredentials ? ' is-invalid' : '')} value={username} onChange={(e) => setUsername(e.target.value)} required />
          {submitted && !username &&
            <div className="invalid-feedback">Username is required</div>
          }
          {invalidCredentials &&
            <div className="invalid-feedback">Invalid username or password</div>
          }
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className={'form-control' + (submitted && !password ? ' is-invalid' : '') + (invalidCredentials ? ' is-invalid' : '')} value={password} onChange={(e) => setPassword(e.target.value)} required />
          {submitted && !password &&
            <div className="invalid-feedback">Password is required</div>
          }
          {invalidCredentials &&
            <div className="invalid-feedback">Invalid username or password</div>
          }
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <div className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;