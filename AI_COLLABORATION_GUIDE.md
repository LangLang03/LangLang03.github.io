# 神人百科 - AI协作指南

## 1. 引言
本指南旨在帮助用户了解如何通过AI协作修改和维护神人百科项目。无论您是技术用户还是非技术用户，都可以通过本指南学习如何向AI提交需求、获取代码，并提交Pull Request (PR)。

## 2. AI平台介绍

### 2.1 主流AI平台
- **豆包**：https://www.doubao.com/ - 字节跳动开发的AI助手
- **DeepSeek**：https://www.deepseek.com/ - 深度求索开发的AI助手
- **GitHub Copilot**：https://github.com/features/copilot - GitHub开发的AI代码助手
- **ChatGPT**：https://chat.openai.com/ - OpenAI开发的AI助手

### 2.2 选择建议
- **非技术用户**：推荐使用豆包或DeepSeek，界面友好，操作简单
- **技术用户**：推荐使用GitHub Copilot或ChatGPT，支持更复杂的代码生成

## 3. 向AI提交需求的基本流程

### 3.1 准备工作
1. 了解项目结构和基本功能（参考GITHUB_CONTRIBUTING.md）
2. 明确您的需求（添加神人、修改内容、更新术语表等）
3. 准备好相关信息（如神人名称、描述、关键词等）

### 3.2 需求格式
向AI提交需求时，应使用清晰的结构和具体的要求：

```
请帮我在神人百科项目中[执行的操作，如添加/修改/删除]，具体要求如下：

1. **基本信息**：
   - [字段1]：[值1]
   - [字段2]：[值2]

2. **技术要求**：
   - [要求1]
   - [要求2]

3. **文件修改**：
   - [文件名1]：[修改内容]
   - [文件名2]：[修改内容]
```

### 3.3 不同AI平台的使用方法

#### 3.3.1 豆包
1. 访问豆包官网：https://www.doubao.com/
2. 登录或注册账号
3. 在聊天框中输入您的需求，使用上述格式
4. 点击发送按钮
5. 等待AI生成结果
6. 下载或复制生成的代码

#### 3.3.2 DeepSeek
1. 访问DeepSeek官网：https://www.deepseek.com/
2. 登录或注册账号
3. 选择"DeepSeek Code"模型
4. 在聊天框中输入您的需求，使用上述格式
5. 点击发送按钮
6. 等待AI生成结果
7. 下载或复制生成的代码

#### 3.3.3 GitHub Copilot
1. 安装GitHub Copilot插件到您的编辑器（VS Code、JetBrains等）
2. 打开项目文件
3. 在编辑器中输入注释，描述您的需求
4. 等待Copilot生成代码建议
5. 接受或修改生成的代码

#### 3.3.4 ChatGPT
1. 访问ChatGPT官网：https://chat.openai.com/
2. 登录或注册账号
3. 选择"GPT-4"模型
4. 在聊天框中输入您的需求，使用上述格式
5. 点击发送按钮
6. 等待AI生成结果
7. 下载或复制生成的代码

## 4. 具体需求示例

### 4.1 添加新神人

#### 需求示例
```
请帮我在神人百科项目中添加一个新的神人条目，具体要求如下：

1. **基本信息**：
   - 姓名：张三
   - ID：zhangsan
   - 类别：编程圈神人
   - 描述：一个擅长编写bug的程序员，以其独特的编程风格闻名
   - 关键词：张三，bug，编程风格
   - 神人指数：8.0
   - 头像：使用默认头像（暂时不提供图片）

2. **章节信息**：
   - 章节标题：琐事
   - 章节ID：trivia
   - 章节描述：张三的一些有趣琐事
   - 章节类型：琐事
   - AI创作：true
   - 数据验证：false

3. **页面内容**：
   - 页面标题：张三的琐事
   - 页面内容：张三喜欢在代码中添加隐藏的注释，他的代码中经常出现"// TODO: 修复这个bug"，但永远不会修复
   - 页面路径：/s/zhangsan/trivia.html

4. **术语表**：
   - 自动生成相关术语表条目，包括"bug"和"编程风格"

5. **技术要求**：
   - 所有代码不能写死，必须使用动态数据
   - 样式要与现有页面一致
   - 适配亮色和暗色模式
   - 调用generateStatusBanner函数显示状态
   - 支持术语高亮

6. **文件创建**：
   - 创建s/zhangsan/目录
   - 创建s/zhangsan/list.html页面
   - 创建s/zhangsan/trivia.html页面
   - 创建s/zhangsan/entries.json术语表
   - 更新info.json文件，添加张三的信息
```

### 4.2 修改现有内容

#### 需求示例
```
请帮我修改WebIDE开发者的软件评价章节，具体要求如下：

1. **修改内容**：
   - 将ai字段从true改为false
   - 将data_verified字段从true改为false
   - 更新描述为：WebIDE - 垃圾中的战斗机，最新版本更加垃圾

2. **技术要求**：
   - 确保JSON格式正确
   - 只修改指定字段，不修改其他内容

3. **文件修改**：
   - 更新info.json，修改WebIDE的software章节
```

### 4.3 更新术语表

#### 需求示例
```
请帮我更新全局术语表，添加一个新的术语，具体要求如下：

1. **术语信息**：
   - 术语：AI创作
   - 定义：使用人工智能技术生成的内容
   - 分类：技术

2. **技术要求**：
   - 确保JSON格式正确
   - 与现有术语表结构一致

3. **文件修改**：
   - 更新entries.json，在entries数组中添加新术语
```

### 4.4 创建全新页面

#### 需求示例
```
请帮我创建一个全新的关于页面，具体要求如下：

1. **页面信息**：
   - 页面标题：关于我们
   - 页面路径：/about.html
   - 页面内容：介绍神人百科的宗旨、团队和联系方式

2. **技术要求**：
   - 样式与现有页面一致
   - 适配亮色和暗色模式
   - 包含导航菜单
   - 响应式设计

3. **文件创建**：
   - 创建about.html文件
   - 确保所有链接正确
   - 调用必要的JavaScript函数
```

## 4. AI生成代码的使用方法

### 4.1 接收AI生成的代码
- AI会生成代码片段或完整文件
- 您需要仔细检查代码，确保符合项目规范
- 对于复杂需求，AI可能会生成多个文件的修改

### 4.2 测试代码
1. 将AI生成的代码复制到本地项目中
2. 启动本地服务器（参考第6节）
3. 在浏览器中测试修改效果
4. 检查是否有语法错误或功能问题

### 4.3 常见问题及解决
- **JSON格式错误**：使用https://jsonlint.com检查格式
- **链接错误**：检查文件路径是否正确
- **样式问题**：确保CSS类名与现有样式一致
- **JavaScript错误**：使用浏览器开发者工具检查控制台错误

## 5. Pull Request (PR) 提交教程

### 5.1 准备工作
1. **安装Git**：
   - 访问https://git-scm.com/downloads下载Git
   - 按照安装向导完成安装
   - 验证安装：`git --version`

2. **注册GitHub账号**：
   - 访问https://github.com注册账号
   - 验证邮箱

3. **安装GitHub Desktop**（推荐非技术用户）：
   - 访问https://desktop.github.com下载
   - 安装并登录

### 5.2 Fork仓库
1. 访问项目GitHub页面：https://github.com/LangLang03/LangLang03.github.io
2. 点击右上角的"Fork"按钮（绿色）
3. 选择您的GitHub账号，点击"Create fork"
4. 等待仓库复制完成

### 5.3 克隆仓库到本地

#### 使用GitHub Desktop
1. 打开GitHub Desktop
2. 点击"File" > "Clone Repository"
3. 选择"Your repositories"标签
4. 选择您fork的仓库
5. 选择本地保存路径，点击"Clone"

#### 使用Git命令行
```bash
git clone https://github.com/您的用户名/LangLang03.github.io.git
cd LangLang03.github.io
```

### 5.4 创建分支

#### 使用GitHub Desktop
1. 点击当前分支下拉菜单（默认显示"main"）
2. 点击"New Branch"
3. 输入分支名称（如"add-zhangsan"）
4. 点击"Create Branch"

#### 使用Git命令行
```bash
git checkout -b add-zhangsan
```

### 5.5 应用AI生成的修改
1. 将AI生成的代码复制到本地仓库的对应文件中
2. 或创建新文件（如果需要）
3. 确保所有修改符合项目规范

### 5.6 测试修改
1. 启动本地服务器：
   ```bash
   python -m http.server 8000
   ```
2. 在浏览器中访问http://localhost:8000
3. 测试修改后的效果
4. 确保所有功能正常

### 5.7 提交修改

#### 使用GitHub Desktop
1. 查看左侧的"Changes"面板
2. 勾选要提交的文件
3. 输入提交信息：
   - 标题：简洁描述修改内容（如"Add zhangsan entry"）
   - 描述：详细描述修改内容（可选）
4. 点击"Commit to add-zhangsan"

#### 使用Git命令行
```bash
git add .
git commit -m "Add zhangsan entry"
```

### 5.8 推送分支到GitHub

#### 使用GitHub Desktop
1. 点击右上角的"Push origin"按钮
2. 等待推送完成

#### 使用Git命令行
```bash
git push -u origin add-zhangsan
```

### 5.9 创建Pull Request
1. 访问您的fork仓库页面：https://github.com/您的用户名/LangLang03.github.io
2. 点击"Compare & pull request"按钮
3. 填写PR信息：
   - **标题**：简洁描述PR内容
   - **描述**：详细描述修改内容、动机和测试情况
   - **Reviewers**：选择项目维护者（可选）
   - **Assignees**：选择自己
   - **Labels**：添加适当的标签（如"enhancement"、"bug"）
4. 点击"Create pull request"按钮

### 5.10 PR审查和合并
1. 等待项目维护者审查您的PR
2. 如果有修改意见，根据意见修改代码并重新提交
3. 当PR被批准后，项目维护者会将其合并到主分支
4. 您会收到合并通知
5. 可以删除您的分支（可选）

## 6. 本地测试环境搭建

### 6.1 使用Python内置服务器
1. 确保已安装Python（https://www.python.org/downloads/）
2. 打开命令提示符或终端
3. 进入项目目录：`cd LangLang03.github.io/web`
4. 启动服务器：`python -m http.server 8000`
5. 在浏览器中访问：http://localhost:8000

### 6.2 使用VS Code Live Server
1. 安装VS Code（https://code.visualstudio.com/）
2. 安装Live Server扩展
3. 打开项目文件夹
4. 点击底部状态栏的"Go Live"按钮
5. 浏览器会自动打开项目页面

## 7. 最佳实践

### 7.1 需求编写技巧
- **具体明确**：避免模糊不清的需求，提供具体的数值和描述
- **结构清晰**：使用列表和小标题，便于AI理解
- **遵循规范**：参考项目文档中的数据规范和样式规范
- **逐步细化**：对于复杂需求，可以分步骤向AI提问

### 7.2 AI交互技巧
- **追问细节**：如果AI生成的代码不符合要求，可以进一步追问
- **提供反馈**：告诉AI哪些部分正确，哪些部分需要修改
- **使用示例**：提供现有代码示例，让AI参考
- **保持耐心**：对于复杂需求，可能需要多次交互

### 7.3 代码质量要求
- **遵循规范**：确保代码符合项目的命名和格式规范
- **注释清晰**：添加必要的注释，解释复杂逻辑
- **测试充分**：确保代码在不同环境下都能正常运行
- **安全性**：避免引入安全漏洞

## 8. 非技术用户特别指南

### 8.1 简化流程
1. 使用豆包或DeepSeek生成代码
2. 下载生成的代码文件
3. 使用GitHub Desktop进行PR提交
4. 寻求技术用户的帮助（如果遇到问题）

### 8.2 常见问题
- **不知道如何使用Git**：推荐使用GitHub Desktop，图形化界面操作简单
- **不会测试代码**：可以直接提交PR，项目维护者会进行测试
- **担心代码质量**：AI生成的代码通常符合基本规范，项目维护者会进行审查

### 8.3 寻求帮助
- 在GitHub Issues中提问：https://github.com/LangLang03/LangLang03.github.io/issues
- 联系项目维护者：通过GitHub页面的联系方式

## 9. 总结

通过本指南，您应该已经了解了如何通过AI协作修改神人百科项目，包括：
- 向不同AI平台提交需求的方法
- 如何编写有效的需求
- 如何使用AI生成的代码
- 如何提交Pull Request

无论您是技术用户还是非技术用户，都可以通过AI协作参与项目开发。我们欢迎所有形式的贡献，共同维护和完善神人百科项目。

---

**文档版本**：v1.0
**更新日期**：2026-01-17
**作者**：项目团队