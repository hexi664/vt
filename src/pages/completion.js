import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';

export default function Completion() {
  const router = useRouter();
  
  const handleRestart = () => {
    router.push('/');
  };
  
  return (
    <Layout title="完成">
      <div className="completion-container">
        <div className="completion-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1 className="completion-title">恭喜！VT已成功开启</h1>
        
        <p className="completion-message">
          您已成功完成虚拟化技术(VT)的开启步骤。现在您可以运行需要虚拟化支持的应用程序了。
        </p>
        
        <Button onClick={handleRestart}>
          返回首页
        </Button>
        
        <p className="mt-5 text-sm text-text-secondary">
          如果您在使用过程中遇到任何问题，请随时联系我们的技术支持团队。
        </p>
      </div>
    </Layout>
  );
} 