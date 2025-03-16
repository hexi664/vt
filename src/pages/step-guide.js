import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import Card from '../components/Card';
import StepNavigation from '../components/StepNavigation';
import FloatingCameraButton from '../components/FloatingCameraButton';
import { getVTSteps } from '../services/openai';
import { initOpenAI } from '../services/openai';

// 默认步骤数据（当API调用失败或等待响应时显示）
const defaultSteps = [
  {
    number: 1,
    title: "重启电脑进入BIOS设置",
    details: [
      "保存您当前正在进行的工作",
      "点击Windows开始菜单",
      "点击电源按钮",
      "按住Shift键的同时点击\"重启\"",
      "在出现的高级启动选项中，选择\"疑难解答\"",
      "选择\"高级选项\"",
      "选择\"UEFI固件设置\"",
      "点击\"重启\""
    ]
  },
  {
    number: 2,
    title: "在BIOS中找到虚拟化设置",
    details: [
      "进入BIOS后，使用方向键导航",
      "找到\"Advanced\"或\"高级\"选项卡",
      "寻找\"CPU Configuration\"或\"处理器配置\"选项",
      "找到\"Virtualization Technology\"或\"虚拟化技术\"选项"
    ]
  },
  {
    number: 3,
    title: "启用虚拟化技术",
    details: [
      "选择\"Virtualization Technology\"或\"虚拟化技术\"选项",
      "将其设置为\"Enabled\"或\"启用\"",
      "有些电脑可能将此选项命名为\"Intel VT-x\"、\"AMD-V\"或\"SVM Mode\""
    ]
  },
  {
    number: 4,
    title: "保存设置并退出",
    details: [
      "按F10键或找到\"Save & Exit\"或\"保存并退出\"选项",
      "选择\"Yes\"或\"是\"确认保存更改",
      "电脑将自动重启"
    ]
  },
  {
    number: 5,
    title: "验证虚拟化技术是否已启用",
    details: [
      "电脑重启后，按Win+R打开运行对话框",
      "输入\"msinfo32\"并按回车",
      "在系统信息窗口中，找到\"系统摘要\"",
      "查找\"虚拟化已启用\"项，如果显示\"是\"，则表示虚拟化技术已成功启用"
    ]
  }
];

export default function StepGuide() {
  const router = useRouter();
  const { brand, model, motherboard } = router.query;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(defaultSteps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 初始化OpenAI并获取步骤
  useEffect(() => {
    const fetchSteps = async () => {
      if (!brand || !model) {
        setLoading(false);
        return;
      }
      
      try {
        // 在实际应用中，应该从环境变量或安全的后端API获取API密钥
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-api-key';
        initOpenAI(apiKey);
        
        const deviceInfo = {
          brand: brand || '未指定品牌',
          model: model || '未指定型号',
          motherboard: motherboard || '未指定主板'
        };
        
        const stepsData = await getVTSteps(deviceInfo);
        setSteps(stepsData);
      } catch (err) {
        console.error('获取步骤失败:', err);
        setError('获取步骤失败，请检查网络连接或稍后重试。');
        // 使用默认步骤
      } finally {
        setLoading(false);
      }
    };
    
    fetchSteps();
  }, [brand, model, motherboard]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 最后一步完成后，导航到完成页面
      router.push({
        pathname: '/completion',
        query: { brand, model, motherboard }
      });
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // 第一步返回时，返回设备选择页面
      router.push('/device-selection');
    }
  };
  
  // 当前显示的步骤
  const step = steps[currentStep];
  
  return (
    <Layout 
      title={`步骤 ${currentStep + 1}/${steps.length}`} 
      showBackButton={true} 
      onBack={handlePrev}
    >
      <div className="step-container">
        {/* 设备信息卡片 */}
        {(brand || model || motherboard) && (
          <Card 
            className="mb-5" 
            style={{ 
              backgroundColor: '#f8f9fa', 
              borderLeft: '4px solid #007aff' 
            }}
          >
            <h3 className="mt-0 mb-2 font-semibold">您的设备信息</h3>
            <p className="m-0">
              {brand && <><strong>品牌:</strong> {brand}<br /></>}
              {model && <><strong>型号:</strong> {model}<br /></>}
              {motherboard && <><strong>主板类型:</strong> {motherboard}</>}
            </p>
          </Card>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>正在加载步骤指南...</p>
          </div>
        ) : error ? (
          <Card className="bg-red-50 border-l-4 border-red-500">
            <p className="text-red-600">{error}</p>
          </Card>
        ) : step ? (
          <>
            <h2 className="mb-4 text-xl font-semibold">{step.title}</h2>
            
            <div className="relative w-full h-48 mb-5">
              <Image 
                src="https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt={step.title} 
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            
            <div className="step-description">
              {step.details.map((detail, index) => (
                <p key={index} className="mb-2">
                  {index + 1}. {detail}
                </p>
              ))}
            </div>
            
            {currentStep === 0 && (
              <Card 
                className="bg-blue-50 border-l-4 border-blue-500 mb-5"
              >
                <p className="m-0">
                  <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                  <strong>提示：</strong> 不同品牌电脑进入BIOS的快捷键可能不同，常见的有F2、F10、Del等。您也可以在开机时按对应按键直接进入BIOS。
                </p>
              </Card>
            )}
            
            <StepNavigation 
              onPrev={handlePrev} 
              onNext={handleNext} 
              prevDisabled={false}
              nextDisabled={false}
            />
          </>
        ) : (
          <Card className="bg-yellow-50 border-l-4 border-yellow-500">
            <p>未找到步骤信息，请返回选择您的设备。</p>
          </Card>
        )}
      </div>
      
      {/* 悬浮拍照按钮 */}
      <FloatingCameraButton 
        deviceInfo={{ brand, model, motherboard }}
      />
    </Layout>
  );
} 