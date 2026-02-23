# YouTube Channel ID Finder

[![English](https://img.shields.io/badge/Language-English-blue)](README.md)
[![简体中文](https://img.shields.io/badge/语言-简体中文-red)](README.zh-CN.md)

A lightweight Chrome extension that extracts YouTube `Channel ID` (for example `UCxxxxxxxx...`) directly from channel page source.

## Features
- Detects channel IDs from page source patterns such as:
  - `"channelIds":["UC..."]`
- Fallback matching for standard `UC...` channel ID format.
- Works with YouTube SPA navigation (route changes are re-detected).
- One-click `Copy ID` and `Copy RSS Feed URL`.
- Auto-close popup after copy.

## Install (Developer Mode)
1. Open Chrome extensions page: `chrome://extensions/`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this project folder

## Usage
1. Open a YouTube channel page, for example:
   - `https://www.youtube.com/@channelHandle`
   - `https://www.youtube.com/channel/UC...`
2. Click the extension icon.
3. The popup shows detected Channel ID.
4. Click `Copy ID` to copy channel ID.
5. Click `Copy RSS Feed URL` to copy:
   - `https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>`

## Project Structure
- `manifest.json`: extension config (MV3)
- `content.js`: parse page source and extract channel IDs
- `popup.html`: popup UI
- `popup.css`: popup styles
- `popup.js`: popup logic (display + copy)
- `icons/`: extension icons (`16/32/48/128`)

## Privacy
- No data is sent to external servers.
- Parsing is done locally in your browser.
- The extension only runs on YouTube domains declared in `manifest.json`.

## Contributing
See `CONTRIBUTING.md`.

## Changelog
See `CHANGELOG.md`.

## License
MIT
