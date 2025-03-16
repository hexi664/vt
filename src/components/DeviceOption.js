import React from 'react';
import Image from 'next/image';

const DeviceOption = ({ image, name, description, onClick }) => {
  return (
    <div className="device-option cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 mr-4 relative">
        <Image 
          src={image} 
          alt={name} 
          layout="fill" 
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold mb-1">{name}</div>
        <div className="text-text-secondary text-sm">{description}</div>
      </div>
      <i className="fas fa-chevron-right text-gray-300"></i>
    </div>
  );
};

export default DeviceOption; 