import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { recognizeAndMarkBIOSMenu } from '../services/openai';
import { simulateMenuMarking } from '../services/imageProcessor';
import { initOpenAI } from '../services/openai';

export default function RecognitionResult() {
  const router = useRouter();
  const { imageData, brand, model, motherboard } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [markedImage, setMarkedImage] = useState(null);
  
  // 处理图像识别
  useEffect(() => {
    const processImage = async () => {
      if (!imageData) {
        setError('未提供图像数据');
        setLoading(false);
        return;
      }
      
      try {
        // 在实际应用中，应该从环境变量或安全的后端API获取API密钥
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-api-key';
        initOpenAI(apiKey);
        
        // 调用OpenAI Vision API识别BIOS界面
        const result = await recognizeAndMarkBIOSMenu(imageData);
        setAnalysis(result.analysis);
        
        // 提取菜单名称（简单示例，实际应用中需要更复杂的解析）
        const menuNameMatch = result.analysis.match(/应该点击[：:]\s*["'](.+?)["']/i) || 
                             result.analysis.match(/选择[：:]\s*["'](.+?)["']/i) ||
                             result.analysis.match(/找到[：:]\s*["'](.+?)["']/i);
        
        const menuName = menuNameMatch ? menuNameMatch[1] : '虚拟化技术选项';
        
        // 模拟在图像上标记菜单选项
        const imageUrl = `data:image/jpeg;base64,${imageData}`;
        const marked = await simulateMenuMarking(imageUrl, menuName);
        setMarkedImage(marked);
      } catch (err) {
        console.error('处理图像失败:', err);
        setError('处理图像失败，请重试。');
      } finally {
        setLoading(false);
      }
    };
    
    if (imageData) {
      processImage();
    }
  }, [imageData]);
  
  const handleBack = () => {
    router.push({
      pathname: '/camera-recognition',
      query: { brand, model, motherboard }
    });
  };
  
  const handleContinue = () => {
    router.push({
      pathname: '/step-guide',
      query: { brand, model, motherboard }
    });
  };
  
  return (
    <Layout 
      title="识别结果" 
      showBackButton={true} 
      onBack={handleBack}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p>正在分析BIOS界面...</p>
          <p className="text-sm text-text-secondary mt-2">这可能需要几秒钟时间</p>
        </div>
      ) : error ? (
        <Card className="bg-red-50 border-l-4 border-red-500">
          <p className="text-red-600">{error}</p>
          <Button onClick={handleBack} className="mt-4">
            返回重试
          </Button>
        </Card>
      ) : (
        <div>
          {markedImage && (
            <div className="mb-5">
              <div className="relative w-full rounded-xl overflow-hidden">
                <img 
                  src={markedImage} 
                  alt="标记的BIOS界面" 
                  className="w-full"
                />
              </div>
              <p className="text-sm text-text-secondary text-center mt-2">
                已标记需要点击的菜单选项
              </p>
            </div>
          )}
          
          <Card className="mb-5">
            <h3 className="mt-0 mb-2.5 font-semibold">分析结果</h3>
            <p className="whitespace-pre-line">{analysis}</p>
          </Card>
          
          <div className="flex space-x-4">
            <Button secondary onClick={handleBack} className="flex-1">
              重新拍照
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              继续步骤
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
} 