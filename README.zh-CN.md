# YouTube Channel ID Finder

[![English](https://img.shields.io/badge/Language-English-blue)](README.md)
[![简体中文](https://img.shields.io/badge/语言-简体中文-red)](README.zh-CN.md)

一个轻量的 Chrome 扩展，用于在 YouTube 频道页面中提取 `Channel ID`（例如 `UCxxxxxxxx...`）。

## 功能
- 从页面源码中匹配 `channelIds` 字段，例如：
  - `"channelIds":["UC..."]`
- 兜底匹配标准 `UC...` 格式频道 ID。
- 兼容 YouTube 单页应用路由切换（自动重新检测）。
- 支持“复制 ID”和“复制 RSS 订阅链接”两个按钮。
- 复制成功后自动关闭弹窗。

## 安装（开发者模式）
1. 打开 Chrome 扩展页面：`chrome://extensions/`
2. 开启右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择本项目目录

## 使用方法
1. 打开任意 YouTube 频道主页，例如：
   - `https://www.youtube.com/@channelHandle`
   - `https://www.youtube.com/channel/UC...`
2. 点击扩展图标
3. 弹窗会显示检测到的 Channel ID
4. 点击“复制 ID”可复制频道 ID
5. 点击“复制 RSS 订阅链接”可复制 RSS 地址：
   - `https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>`

## 项目结构
- `manifest.json`: 扩展配置（MV3）
- `content.js`: 解析页面源码并提取频道 ID
- `popup.html`: 弹窗界面
- `popup.css`: 弹窗样式
- `popup.js`: 弹窗逻辑（显示 + 复制）
- `icons/`: 扩展图标（`16/32/48/128`）

## 隐私说明
- 不会向外部服务器上传数据。
- 解析逻辑全部在浏览器本地执行。
- 扩展仅在 `manifest.json` 声明的 YouTube 域名下运行。

## 参与贡献
详见 `CONTRIBUTING.md`。

## 更新日志
详见 `CHANGELOG.md`。

## 许可证
MIT
