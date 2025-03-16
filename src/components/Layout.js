import React from 'react';

const Layout = ({ children, title, showBackButton = false, onBack }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex flex-col h-screen">
      {/* 状态栏 */}
      <div className="status-bar">
        <div className="time">{currentTime}</div>
        <div className="icons">
          <i className="fas fa-signal"></i>
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-full"></i>
        </div>
      </div>
      
      {/* 导航栏 */}
      <div className="nav-bar">
        <div>
          {showBackButton && (
            <i className="fas fa-arrow-left cursor-pointer" onClick={onBack}></i>
          )}
        </div>
        <div className="nav-title">{title}</div>
        <div>
          {title === 'VT开启助手' ? (
            <i className="fas fa-cog"></i>
          ) : title === '选择您的设备' ? (
            <i className="fas fa-search"></i>
          ) : (
            <i className="fas fa-ellipsis-v"></i>
          )}
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout; 