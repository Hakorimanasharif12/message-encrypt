"use client";
import React from 'react';


const WhatsAppButton: React.FC<{ show: boolean }> = ({ show }) => {

  if (!show) return null;

  const handleClick = () => {
    window.open('https://wa.me/250798388890', '_blank'); // Replace '250798388890' with your actual number (including country code)
  };
  

  return (
    <button onClick={handleClick} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '50%', padding: '15px', cursor: 'pointer' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
    </button>
  );
};

export default WhatsAppButton;
