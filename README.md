# YouTube Channel ID Finder

A lightweight Chrome extension that extracts YouTube `Channel ID` (for example `UCxxxxxxxx...`) directly from channel page source.

## Features
- Detects channel IDs from page source patterns such as:
  - `"channelIds":["UC..."]`
- Fallback matching for standard `UC...` channel ID format.
- Works with YouTube SPA navigation (route changes are re-detected).
- One-click copy and auto-close popup after copy.

## Install (Developer Mode)
1. Open Chrome extensions page: `chrome://extensions/`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this folder

## Usage
1. Open a YouTube channel page, such as:
  - `https://www.youtube.com/@channelHandle`
  - `https://www.youtube.com/channel/UC...`
2. Click the extension icon.
3. The popup shows detected Channel ID.
4. Click `复制` to copy. The popup closes automatically on success.

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

## License
MIT
