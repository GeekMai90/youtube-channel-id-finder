# YouTube Channel ID Finder

A lightweight Chrome extension that extracts YouTube `Channel ID` (for example `UCxxxxxxxx...`) directly from channel page source.

一个轻量的 Chrome 扩展，用于在 YouTube 频道页面中提取 `Channel ID`（例如 `UCxxxxxxxx...`）。

## Features | 功能
- Detects channel IDs from page source patterns such as:
  - `"channelIds":["UC..."]`
- Fallback matching for standard `UC...` channel ID format.
- Works with YouTube SPA navigation (route changes are re-detected).
- One-click `Copy ID` and `Copy RSS Feed URL`.
- Auto-close popup after copy.

- 从页面源码中匹配 `channelIds` 字段。
- 兜底匹配标准 `UC...` 格式频道 ID。
- 兼容 YouTube 单页应用路由切换（自动重新检测）。
- 支持“复制 ID”和“复制 RSS 订阅链接”两个按钮。
- 复制成功后自动关闭弹窗。

## Install | 安装（开发者模式）
1. Open Chrome extensions page: `chrome://extensions/`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this project folder

1. 打开 Chrome 扩展页面：`chrome://extensions/`
2. 开启右上角“开发者模式”
3. 点击“加载已解压的扩展程序”
4. 选择本项目目录

## Usage | 使用方法
1. Open a YouTube channel page, for example:
   - `https://www.youtube.com/@channelHandle`
   - `https://www.youtube.com/channel/UC...`
2. Click the extension icon.
3. The popup shows detected Channel ID.
4. Click `复制 ID` to copy channel ID.
5. Click `复制 RSS 订阅链接` to copy:
   - `https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>`

1. 打开任意 YouTube 频道主页，例如：
   - `https://www.youtube.com/@channelHandle`
   - `https://www.youtube.com/channel/UC...`
2. 点击扩展图标
3. 弹窗会显示检测到的 Channel ID
4. 点击“复制 ID”可复制频道 ID
5. 点击“复制 RSS 订阅链接”可复制 RSS 地址：
   - `https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>`

## Project Structure | 项目结构
- `manifest.json`: extension config (MV3)
- `content.js`: parse page source and extract channel IDs
- `popup.html`: popup UI
- `popup.css`: popup styles
- `popup.js`: popup logic (display + copy)
- `icons/`: extension icons (`16/32/48/128`)

## Privacy | 隐私说明
- No data is sent to external servers.
- Parsing is done locally in your browser.
- The extension only runs on YouTube domains declared in `manifest.json`.

- 不会向外部服务器上传数据。
- 解析逻辑全部在浏览器本地执行。
- 扩展仅在 `manifest.json` 声明的 YouTube 域名下运行。

## Contributing | 参与贡献
See `CONTRIBUTING.md`.

## License
MIT
