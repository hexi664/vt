import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  
  const handleStart = () => {
    router.push('/device-selection');
  };
  
  return (
    <Layout title="VT开启助手">
      <div className="flex flex-col items-center justify-center h-full text-center px-5">
        <div className="w-32 h-32 rounded-3xl mb-6 relative">
          <Image 
            src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
            alt="VT开启助手" 
            layout="fill"
            className="rounded-3xl"
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">欢迎使用VT开启助手</h1>
        
        <p className="text-text-secondary mb-10 leading-relaxed">
          本应用将帮助您一步步开启设备的虚拟化技术(VT)功能，让您的电脑性能更强大。
        </p>
        
        <Button onClick={handleStart}>
          开始使用
        </Button>
        
        <p className="mt-5 text-sm text-text-secondary">
          支持多种品牌电脑 · 智能识别 · 步骤清晰
        </p>
      </div>
    </Layout>
  );
} 