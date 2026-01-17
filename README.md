# 神人百科

记录世间神人，揭露丑恶嘴脸，警示世人引以为戒

## 项目介绍

神人百科是一个记录编程圈各类神人的网站，详细记录了他们的言行、作品和影响，让世人看清其真实面目。

## 功能特性

- **神人记录**：详细记录编程圈各类神人，包括其言行、作品和影响
- **智能搜索**：强大的搜索功能，支持按关键词、类别等多种方式查找神人
- **客观评价**：基于事实的客观评价，区分AI创作和真实数据
- **响应式设计**：确保网站在不同设备上都能正常显示
- **主题切换**：支持亮色模式和暗色模式切换

## 项目结构

```
web/
├── css/
│   └── styles.css          # 主样式文件
├── js/
│   └── main.js             # 主JavaScript文件
├── s/                      # 神人详细信息目录
│   └── webide/             # WebIDE开发者信息
│       ├── entries.json    # WebIDE专属术语表
│       ├── list.html       # WebIDE列表页
│       ├── software.html   # WebIDE软件评价
│       ├── personal.html   # WebIDE个人评价
│       ├── photos.html     # WebIDE照片集
│       └── photos/         # WebIDE照片目录
├── res/                    # 资源文件目录
│   └── wbide.jpg           # WebIDE头像
├── entries.json            # 全局术语表
├── info.json               # 神人信息数据
├── index.html              # 主页
└── README.md               # 项目说明文档
```

## 技术栈

- **HTML5**：网页结构
- **CSS3**：网页样式
- **JavaScript (ES6+)**：交互功能
- **JSON**：数据存储
- **Git**：版本控制
- **GitHub Pages**：网站托管

## 数据说明

- 所有神人信息存储在 `info.json` 文件中
- 术语表存储在 `entries.json` 文件中
- 支持AI创作和真实数据的区分
- 每个神人有独立的目录，包含详细信息和照片

## 安装部署

1. 克隆仓库：
   ```bash
   git clone https://github.com/LangLang03/LangLang03.github.io.git
   ```

2. 进入项目目录：
   ```bash
   cd LangLang03.github.io
   ```

3. 启动本地服务器：
   ```bash
   python -m http.server 8000
   ```

4. 在浏览器中访问：
   ```
   http://localhost:8000
   ```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## AI 创作声明

本项目由 AI 辅助创作，包括但不限于：
- 网站设计和布局
- 代码编写和优化
- 文档撰写
- 数据整理

## 版权信息

本网站仅用于揭露丑恶，警示世人，内容仅供参考。

© 2026 神人百科
