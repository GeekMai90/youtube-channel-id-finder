const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const extraEl = document.getElementById("extra");
const channelIdEl = document.getElementById("channelId");
const copyIdBtn = document.getElementById("copyIdBtn");
const copyRssBtn = document.getElementById("copyRssBtn");

const RSS_FEED_BASE = "https://www.youtube.com/feeds/videos.xml?channel_id=";

function setStatus(text) {
  statusEl.textContent = text;
}

function showResult(channelIds) {
  const [first, ...rest] = channelIds;
  channelIdEl.value = first || "";
  resultEl.classList.remove("hidden");

  if (rest.length > 0) {
    extraEl.textContent = `还检测到 ${rest.length} 个候选 ID: ${rest.join(", ")}`;
    extraEl.classList.remove("hidden");
  } else {
    extraEl.classList.add("hidden");
    extraEl.textContent = "";
  }
}

function clearResult() {
  resultEl.classList.add("hidden");
  extraEl.classList.add("hidden");
  extraEl.textContent = "";
  channelIdEl.value = "";
}

function getRssFeedUrl(channelId) {
  return `${RSS_FEED_BASE}${encodeURIComponent(channelId)}`;
}

async function requestChannelIds(tabId) {
  return chrome.tabs.sendMessage(tabId, { type: "GET_CHANNEL_IDS" });
}

function isYouTubeChannelPage(url = "") {
  if (!url.includes("youtube.com")) {
    return false;
  }

  // 常见频道页路径
  return /(\/(@|channel\/|c\/|user\/)|\/(videos|shorts|streams|community|featured)$)/.test(url);
}

async function run() {
  clearResult();

  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs?.[0];

    if (!tab?.id || !tab?.url) {
      setStatus("无法读取当前标签页。");
      return;
    }

    if (!tab.url.includes("youtube.com")) {
      setStatus("请先打开 YouTube 页面，再点击扩展。 ");
      return;
    }

    if (!isYouTubeChannelPage(tab.url)) {
      setStatus("当前不像是频道主页，仍尝试检测中...");
    } else {
      setStatus("正在从页面源码匹配 channelIds...");
    }

    const payload = await requestChannelIds(tab.id);

    if (!payload || !Array.isArray(payload.channelIds)) {
      setStatus("未拿到内容脚本返回结果，请刷新页面后重试。");
      return;
    }

    if (payload.channelIds.length === 0) {
      setStatus("未在源码中找到 channelIds。可先滚动或刷新后重试。");
      return;
    }

    setStatus("匹配成功");
    showResult(payload.channelIds);
  } catch (error) {
    setStatus(`检测失败: ${error?.message || String(error)}`);
  }
}

function markCopiedAndClose(buttonEl) {
  buttonEl.textContent = "已复制";
  setStatus("复制完成，正在关闭...");
  setTimeout(() => {
    window.close();
  }, 200);
}

async function copyTextAndClose(value, buttonEl) {
  const originalText = buttonEl.textContent;
  if (!value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    markCopiedAndClose(buttonEl);
  } catch (_error) {
    try {
      const tempEl = document.createElement("textarea");
      tempEl.value = value;
      tempEl.setAttribute("readonly", "");
      tempEl.style.position = "fixed";
      tempEl.style.left = "-9999px";
      document.body.appendChild(tempEl);
      tempEl.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(tempEl);
      if (ok) {
        markCopiedAndClose(buttonEl);
        return;
      }
    } catch (_ignored) {
      // ignore
    }

    buttonEl.textContent = originalText;
    setStatus("复制失败，请手动复制后重试。");
  }
}

copyIdBtn.addEventListener("click", async () => {
  const channelId = channelIdEl.value.trim();
  await copyTextAndClose(channelId, copyIdBtn);
});

copyRssBtn.addEventListener("click", async () => {
  const channelId = channelIdEl.value.trim();
  if (!channelId) {
    setStatus("当前没有可用的 Channel ID。");
    return;
  }

  const rssUrl = getRssFeedUrl(channelId);
  await copyTextAndClose(rssUrl, copyRssBtn);
});

run();
