import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (name && email && password && password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:9081/dukes-data/api/users', { name, email, password, role })
        setShowModal(true);
      } catch (error) {
        console.log('Failed to register user');
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/login');
  };


  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className={'form-control' + (submitted && !name ? ' is-invalid' : '')} value={name} onChange={(e) => setName(e.target.value)} required />
          {submitted && !name &&
            <div className="invalid-feedback">Name is required</div>
          }
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className={'form-control' + (submitted && !email ? ' is-invalid' : '')} value={email} onChange={(e) => setEmail(e.target.value)} required />
          {submitted && !email &&
            <div className="invalid-feedback">Email is required</div>
          }
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className={'form-control' + (submitted && !password ? ' is-invalid' : '')} value={password} onChange={(e) => setPassword(e.target.value)} required />
          {submitted && !password &&
            <div className="invalid-feedback">Password is required</div>
          }
        </div>
        <div className="form-group">
  <label>Confirm Password:</label>
  <input type="password" className={'form-control' + (submitted && password !== confirmPassword ? ' is-invalid' : '')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
  {submitted && password !== confirmPassword &&
    <div className="invalid-feedback">Passwords do not match</div>
  }
</div>
<div className="form-group">
          <label>Role:</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your registration was successful! You will now be redirected to the login page.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;