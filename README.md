# VT开启助手

一个帮助用户开启电脑虚拟化技术(VT)的移动端网页应用。

## 功能特点

- 设备选择：支持多种品牌和型号的电脑
- 步骤指南：提供详细的VT开启步骤
- 相机识别：拍照识别BIOS界面并提供指导
- 响应式设计：适配各种移动设备屏幕

## 技术栈

- Next.js
- React
- Tailwind CSS
- OpenAI API

## 安装与使用

1. 克隆仓库
```bash
git clone https://github.com/您的用户名/vt-helper.git
cd vt-helper
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建`.env.local`文件并添加：
```
OPENAI_API_KEY=您的OpenAI_API密钥
```

4. 开发环境运行
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
npm run start
```

## 部署

推荐使用Vercel部署：
1. 将代码推送到GitHub仓库
2. 在Vercel中导入该仓库
3. 配置环境变量
4. 点击部署

## 许可证

MIT 