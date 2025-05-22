import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';
import logo from '../assets/logo.jpeg'; // Ensure logo is in src/assets/

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="success-container"><p>No data submitted.</p></div>;

  return (
    <div className="success-container">
      <img src={logo} alt="Logo" className="success-logo" />
      <h2>Submission Successful</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
};

export default Success;
