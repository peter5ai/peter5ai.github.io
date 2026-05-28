# Tasks
- [ ] Task 1: 添加全局防止水平溢出样式
  - [ ] 在 html 和 body 上添加 overflow-x: hidden
  - [ ] 确保所有元素默认 box-sizing: border-box
  - [ ] 添加全局 word-break 和 overflow-wrap 样式
- [ ] Task 2: 修复容器宽度问题
  - [ ] 确保 .container 宽度不超过 100vw
  - [ ] 检查并修复所有固定宽度元素
  - [ ] 确保 padding 不会导致溢出
- [ ] Task 3: 修复文本溢出问题
  - [ ] 为所有文本元素添加自动换行
  - [ ] 确保长文本不会撑开容器
  - [ ] 检查特殊字符和英文文本
- [ ] Task 4: 修复图片和卡片溢出问题
  - [ ] 确保所有图片 max-width: 100%
  - [ ] 检查卡片和网格布局
  - [ ] 确保按钮不会溢出
- [ ] Task 5: 清理桌面端媒体查询
  - [ ] 移除所有桌面端样式
  - [ ] 保留移动端样式作为默认
  - [ ] 确保没有冲突的样式

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 2
- Task 5 can be done in parallel with Task 3 and 4
