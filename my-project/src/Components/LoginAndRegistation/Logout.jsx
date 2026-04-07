import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear session storage
    sessionStorage.removeItem('user');
    
    // Redirect to the home page
    navigate('/');
  };

  return logout;
};



export default Logout;
