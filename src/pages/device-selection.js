import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DeviceOption from '../components/DeviceOption';
import Button from '../components/Button';
import Card from '../components/Card';
import { deviceBrands, deviceModels, motherboardTypes } from '../services/deviceData';

export default function DeviceSelection() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  
  // 显示的视图状态：'brands', 'models', 'motherboards'
  const [view, setView] = useState('brands');
  
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setView('models');
  };
  
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setView('motherboards');
  };
  
  const handleMotherboardSelect = (motherboard) => {
    setSelectedMotherboard(motherboard);
    
    // 构建查询参数
    const query = {
      brand: selectedBrand.name,
      model: selectedModel.name,
      motherboard: motherboard.name
    };
    
    // 导航到步骤指南页面
    router.push({
      pathname: '/step-guide',
      query
    });
  };
  
  const handleBack = () => {
    if (view === 'models') {
      setView('brands');
      setSelectedBrand(null);
    } else if (view === 'motherboards') {
      setView('models');
      setSelectedModel(null);
    } else {
      router.push('/');
    }
  };
  
  const handleCameraRecognition = () => {
    router.push('/camera-recognition');
  };
  
  return (
    <Layout 
      title="选择您的设备" 
      showBackButton={true} 
      onBack={handleBack}
    >
      <Card>
        <p>请选择您的电脑品牌、型号和主板类型，我们将为您提供相应的VT开启指南。</p>
      </Card>
      
      {/* 品牌选择视图 */}
      {view === 'brands' && (
        <div>
          <h3 className="mt-5 mb-2 text-sm text-text-secondary">电脑品牌</h3>
          
          {deviceBrands.map((brand) => (
            <DeviceOption
              key={brand.id}
              image={brand.image}
              name={brand.name}
              description={brand.description}
              onClick={() => handleBrandSelect(brand)}
            />
          ))}
          
          <div className="mt-5">
            <Button 
              secondary 
              icon="camera" 
              onClick={handleCameraRecognition}
            >
              拍照自动识别设备
            </Button>
          </div>
        </div>
      )}
      
      {/* 型号选择视图 */}
      {view === 'models' && selectedBrand && (
        <div>
          <div className="flex items-center my-4">
            <h3 className="text-sm text-text-secondary">
              {selectedBrand.name} - 选择设备型号
            </h3>
          </div>
          
          {deviceModels[selectedBrand.id].map((model) => (
            <DeviceOption
              key={model.id}
              name={model.name}
              description={model.description}
              onClick={() => handleModelSelect(model)}
            />
          ))}
        </div>
      )}
      
      {/* 主板类型选择视图 */}
      {view === 'motherboards' && selectedBrand && selectedModel && (
        <div>
          <div className="flex items-center my-4">
            <h3 className="text-sm text-text-secondary">
              {selectedBrand.name} {selectedModel.name} - 选择主板类型
            </h3>
          </div>
          
          {motherboardTypes.map((motherboard) => (
            <DeviceOption
              key={motherboard.id}
              name={motherboard.name}
              description={motherboard.description}
              onClick={() => handleMotherboardSelect(motherboard)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
} 