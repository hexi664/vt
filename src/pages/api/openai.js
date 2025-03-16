import OpenAI from 'openai';

export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许POST请求' });
  }
  
  try {
    const { action, data } = req.body;
    
    // 初始化OpenAI客户端
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // 根据请求的操作类型执行不同的API调用
    switch (action) {
      case 'getVTSteps': {
        const { brand, model, motherboard } = data;
        
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "你是一个专业的电脑技术支持专家，精通各种品牌电脑的BIOS设置和虚拟化技术(VT)开启方法。请提供详细的步骤指导，每个步骤应该清晰明了，便于用户操作。"
            },
            {
              role: "user",
              content: `请提供${brand} ${model}电脑（主板类型：${motherboard}）开启虚拟化技术(VT)的详细步骤指南。请将步骤分为5个主要步骤，每个步骤包含详细的操作说明。`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
        
        // 解析步骤
        const content = response.choices[0].message.content;
        const steps = parseStepsFromResponse(content);
        
        return res.status(200).json({ steps });
      }
      
      case 'recognizeBIOSMenu': {
        const { imageBase64 } = data;
        
        const response = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "system",
              content: "你是一个专业的BIOS界面识别专家，能够准确识别BIOS界面中的菜单选项，并指导用户如何找到并选择开启虚拟化技术(VT)的选项。"
            },
            {
              role: "user",
              content: [
                { 
                  type: "text", 
                  text: "这是一张BIOS界面的截图，请识别界面中的菜单选项，并告诉我在当前界面中，应该点击哪个选项来开启或找到虚拟化技术(VT)设置。请详细描述菜单的位置和名称，以及我应该如何操作。" 
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          max_tokens: 1000,
        });
        
        return res.status(200).json({ 
          analysis: response.choices[0].message.content 
        });
      }
      
      default:
        return res.status(400).json({ error: '未知的操作类型' });
    }
  } catch (error) {
    console.error('OpenAI API调用失败:', error);
    return res.status(500).json({ 
      error: '处理请求失败', 
      message: error.message 
    });
  }
}

// 解析响应中的步骤
function parseStepsFromResponse(content) {
  // 简单的解析逻辑，可以根据实际响应格式进行调整
  const steps = [];
  const lines = content.split('\n');
  
  let currentStep = null;
  
  for (const line of lines) {
    // 检测新步骤的开始
    const stepMatch = line.match(/^步骤\s*(\d+)[：:]\s*(.+)/i) || line.match(/^(\d+)[\.、]\s*(.+)/i);
    
    if (stepMatch) {
      if (currentStep) {
        steps.push(currentStep);
      }
      
      currentStep = {
        number: parseInt(stepMatch[1]),
        title: stepMatch[2],
        details: []
      };
    } else if (currentStep && line.trim()) {
      // 将非空行添加到当前步骤的详情中
      currentStep.details.push(line.trim());
    }
  }
  
  // 添加最后一个步骤
  if (currentStep) {
    steps.push(currentStep);
  }
  
  return steps.length > 0 ? steps : [
    {
      number: 1,
      title: "重启电脑进入BIOS设置",
      details: [
        "保存您当前正在进行的工作",
        "点击Windows开始菜单",
        "点击电源按钮",
        "按住Shift键的同时点击"重启"",
        "在出现的高级启动选项中，选择"疑难解答"",
        "选择"高级选项"",
        "选择"UEFI固件设置"",
        "点击"重启""
      ]
    },
    {
      number: 2,
      title: "在BIOS中找到虚拟化设置",
      details: [
        "进入BIOS后，使用方向键导航",
        "找到"Advanced"或"高级"选项卡",
        "寻找"CPU Configuration"或"处理器配置"选项",
        "找到"Virtualization Technology"或"虚拟化技术"选项"
      ]
    },
    {
      number: 3,
      title: "启用虚拟化技术",
      details: [
        "选择"Virtualization Technology"或"虚拟化技术"选项",
        "将其设置为"Enabled"或"启用"",
        "有些电脑可能将此选项命名为"Intel VT-x"、"AMD-V"或"SVM Mode""
      ]
    },
    {
      number: 4,
      title: "保存设置并退出",
      details: [
        "按F10键或找到"Save & Exit"或"保存并退出"选项",
        "选择"Yes"或"是"确认保存更改",
        "电脑将自动重启"
      ]
    },
    {
      number: 5,
      title: "验证虚拟化技术是否已启用",
      details: [
        "电脑重启后，按Win+R打开运行对话框",
        "输入"msinfo32"并按回车",
        "在系统信息窗口中，找到"系统摘要"",
        "查找"虚拟化已启用"项，如果显示"是"，则表示虚拟化技术已成功启用"
      ]
    }
  ];
} 