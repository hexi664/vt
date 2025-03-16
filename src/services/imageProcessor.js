// 将图片转换为Base64编码
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// 从视频流中捕获图像
export const captureImageFromVideo = (videoElement) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // 转换为base64
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const base64String = imageDataUrl.split(',')[1];
      
      resolve(base64String);
    } catch (error) {
      reject(error);
    }
  });
};

// 在图像上标记菜单选项
export const markMenuOption = (imageDataUrl, menuInfo) => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();
      image.src = imageDataUrl;
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        // 绘制红色边框
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        
        // 假设menuInfo包含x, y, width, height属性
        // 实际应用中，这些信息需要从OpenAI的分析结果中提取
        const { x, y, width, height } = menuInfo;
        
        ctx.strokeRect(x, y, width, height);
        
        // 转换为新的DataURL
        const markedImageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(markedImageDataUrl);
      };
      
      image.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

// 模拟菜单标记（当无法从OpenAI响应中提取准确位置时使用）
export const simulateMenuMarking = (imageDataUrl, menuName) => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();
      image.src = imageDataUrl;
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        // 在图像底部添加文本说明
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
        
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`请点击: ${menuName}`, canvas.width / 2, canvas.height - 30);
        
        // 转换为新的DataURL
        const markedImageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(markedImageDataUrl);
      };
      
      image.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

// 提供模拟图片数据（用于测试）
export const getMockImageData = () => {
  // 返回一个简单的1x1像素透明图片的base64编码
  return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
};

// 从本地资源加载模拟BIOS图片
export const loadMockBIOSImage = async () => {
  try {
    // 在实际应用中，可以替换为真实的BIOS截图
    const response = await fetch('/images/mock-bios.jpg');
    const blob = await response.blob();
    return await imageToBase64(blob);
  } catch (error) {
    console.error('加载模拟BIOS图片失败:', error);
    // 返回备用的透明图片
    return getMockImageData();
  }
}; 