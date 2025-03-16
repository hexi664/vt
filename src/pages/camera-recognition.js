import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { captureImageFromVideo, imageToBase64 } from '../services/imageProcessor';

export default function CameraRecognition() {
  const router = useRouter();
  const { brand, model, motherboard } = router.query;
  
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);
  
  // 启动相机
  useEffect(() => {
    const startCamera = async () => {
      try {
        // 检查是否在开发环境中
        const isDev = process.env.NODE_ENV === 'development';
        const useMockCamera = isDev; // 在开发环境中使用模拟相机
        
        if (useMockCamera) {
          console.log('使用模拟相机模式');
          setCameraActive(false);
          setError('当前处于开发环境，相机功能已禁用。请使用"从相册选择"功能上传图片，或在生产环境中测试相机功能。');
          return;
        }
        
        // 检查浏览器是否支持getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError('您的浏览器不支持访问相机。请使用Chrome、Firefox或Safari的最新版本。');
          return;
        }
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        setStream(mediaStream);
        setCameraActive(true);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('启动相机失败:', err);
        
        // 根据错误类型提供更具体的错误信息
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setError('未找到相机设备。请确保您的设备有摄像头并且未被其他应用程序占用。');
        } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('相机访问被拒绝。请在浏览器设置中允许访问相机。');
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          setError('无法访问相机，可能被其他应用程序占用。请关闭其他使用相机的应用后重试。');
        } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
          setError('您的相机不满足要求。请尝试使用其他相机或设备。');
        } else {
          setError(`无法访问相机: ${err.message || '未知错误'}`);
        }
      }
    };
    
    startCamera();
    
    // 组件卸载时停止相机
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const handleCapture = async () => {
    if (!videoRef.current || !cameraActive) {
      setError('相机未就绪，请稍后再试。');
      return;
    }
    
    try {
      const imageBase64 = await captureImageFromVideo(videoRef.current);
      
      // 构建查询参数
      const query = {
        imageData: imageBase64,
        ...(brand && { brand }),
        ...(model && { model }),
        ...(motherboard && { motherboard })
      };
      
      // 导航到识别结果页面
      router.push({
        pathname: '/recognition-result',
        query
      });
    } catch (err) {
      console.error('捕获图像失败:', err);
      setError('捕获图像失败，请重试。');
    }
  };
  
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        setError('请选择有效的图片文件（JPG、PNG等）。');
        return;
      }
      
      // 验证文件大小（限制为10MB）
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError('图片文件过大，请选择小于10MB的图片。');
        return;
      }
      
      // 显示加载状态
      setError('正在处理图片，请稍候...');
      
      const imageBase64 = await imageToBase64(file);
      
      // 构建查询参数
      const query = {
        imageData: imageBase64,
        ...(brand && { brand }),
        ...(model && { model }),
        ...(motherboard && { motherboard })
      };
      
      // 导航到识别结果页面
      router.push({
        pathname: '/recognition-result',
        query
      });
    } catch (err) {
      console.error('读取图像文件失败:', err);
      setError('读取图像文件失败，请重试。');
    }
  };
  
  const handleBack = () => {
    // 根据来源页面决定返回到哪里
    const referrer = document.referrer;
    
    if (referrer.includes('step-guide')) {
      router.push({
        pathname: '/step-guide',
        query: { brand, model, motherboard }
      });
    } else {
      router.push('/device-selection');
    }
  };
  
  return (
    <Layout 
      title="拍照识别" 
      showBackButton={true} 
      onBack={handleBack}
    >
      <div className="p-0">
        <div className="camera-view">
          {cameraActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              {error ? (
                <p className="text-white text-center px-4">{error}</p>
              ) : (
                <p className="text-white text-center">正在启动相机...</p>
              )}
            </div>
          )}
          
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="w-4/5 h-3/5 border-2 border-dashed border-white rounded-lg relative">
              <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-3 border-l-3 border-white"></div>
              <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-3 border-r-3 border-white"></div>
              <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-3 border-l-3 border-white"></div>
              <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-3 border-r-3 border-white"></div>
            </div>
          </div>
          
          <div className="camera-controls">
            <button 
              className="camera-button"
              onClick={handleCapture}
              disabled={!cameraActive}
            >
              <div className="camera-inner"></div>
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <Card>
            <h3 className="mt-0 mb-2.5 font-semibold">拍照提示</h3>
            <p className="m-0">请将BIOS界面中的菜单选项完整地放入取景框内，确保文字清晰可见。</p>
          </Card>
          
          <div className="mt-4">
            <label htmlFor="file-upload">
              <Button secondary icon="image" className="w-full">
                从相册选择
              </Button>
            </label>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 