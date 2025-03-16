import React, { useState } from 'react';
import { useRouter } from 'next/router';

const FloatingCameraButton = ({ deviceInfo = {} }) => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleClick = () => {
    const query = new URLSearchParams();
    
    if (deviceInfo.brand) {
      query.append('brand', encodeURIComponent(deviceInfo.brand));
    }
    if (deviceInfo.model) {
      query.append('model', encodeURIComponent(deviceInfo.model));
    }
    if (deviceInfo.motherboard) {
      query.append('motherboard', encodeURIComponent(deviceInfo.motherboard));
    }
    
    router.push(`/camera-recognition${query.toString() ? '?' + query.toString() : ''}`);
  };
  
  return (
    <div className="fixed bottom-8 right-5 z-50">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-16 right-0 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
            在开发环境中，相机功能可能受限。您可以使用"从相册选择"功能上传图片。
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          </div>
        )}
        <button 
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <i className="fas fa-camera text-white text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingCameraButton; 