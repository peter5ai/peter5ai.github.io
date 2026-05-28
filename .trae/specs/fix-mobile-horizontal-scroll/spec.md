# 修复手机版水平滚动问题 Spec

## Why
用户在手机上打开网站时，页面可以左右滑动，这不符合手机版竖屏浏览的体验。用户要求只能上下滑动查看整个网站，不能出现左右移动。

## What Changes
- **BREAKING**: 将所有布局默认改为移动端适配样式
- 移除所有可能导致水平溢出的 CSS 属性
- 确保所有元素的宽度不超过视口宽度
- 优化文本换行，防止长文本撑开容器
- 确保图片和卡片不会溢出屏幕

## Impact
- Affected specs: 移动端用户体验
- Affected code: index.html 中的所有 CSS 样式

## ADDED Requirements
### Requirement: 禁止水平滚动
The system SHALL ensure that the website does not allow horizontal scrolling on mobile devices.

#### Scenario: 手机竖屏浏览
- **WHEN** 用户在手机上竖屏打开网站
- **THEN** 页面只能上下滑动，不能左右滑动
- **AND** 所有内容都在视口宽度内显示

## MODIFIED Requirements
### Requirement: 布局适配
所有布局默认使用移动端样式：
- 所有 grid 布局默认单列
- 所有 flex 布局默认垂直排列
- 所有文本自动换行
- 所有图片最大宽度为 100%

## REMOVED Requirements
### Requirement: 桌面端媒体查询
**Reason**: 用户只需要手机版，不需要桌面端适配
**Migration**: 移除所有桌面端样式，只保留移动端样式
