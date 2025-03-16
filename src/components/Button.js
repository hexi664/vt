import React from 'react';

const Button = ({ children, onClick, secondary = false, className = '', icon = null }) => {
  return (
    <button 
      className={`btn ${secondary ? 'btn-secondary' : ''} ${className}`} 
      onClick={onClick}
    >
      {icon && <i className={`fas fa-${icon} ${children ? 'mr-2' : ''}`}></i>}
      {children}
    </button>
  );
};

export default Button; 