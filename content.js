(() => {
  const CACHE_KEY = "__yt_channel_ids__";

  function unique(items) {
    return [...new Set(items.filter(Boolean))];
  }

  function extractChannelIdsFromText(text) {
    if (!text || typeof text !== "string") {
      return [];
    }

    const results = [];

    // 示例："channelIds":["UCfQNB91qRP_5ILeu_S_bSkg"]
    const channelIdsArrayRegex = /"channelIds"\s*:\s*\[(.*?)\]/g;
    let arrayMatch;
    while ((arrayMatch = channelIdsArrayRegex.exec(text)) !== null) {
      const inner = arrayMatch[1] || "";
      const idRegex = /"(UC[0-9A-Za-z_-]{20,})"/g;
      let idMatch;
      while ((idMatch = idRegex.exec(inner)) !== null) {
        results.push(idMatch[1]);
      }
    }

    // 兜底：直接匹配 UC 开头的标准 channel id
    const fallbackRegex = /\bUC[0-9A-Za-z_-]{20,}\b/g;
    let fallbackMatch;
    while ((fallbackMatch = fallbackRegex.exec(text)) !== null) {
      results.push(fallbackMatch[0]);
    }

    return unique(results);
  }

  function collectCandidateSource() {
    const parts = [];
    if (document.documentElement?.outerHTML) {
      parts.push(document.documentElement.outerHTML);
    }

    const scripts = Array.from(document.scripts || []);
    for (const script of scripts) {
      if (script.textContent) {
        parts.push(script.textContent);
      }
    }

    return parts.join("\n");
  }

  function detectFromCurrentPage() {
    const text = collectCandidateSource();
    const channelIds = extractChannelIdsFromText(text);

    const payload = {
      channelIds,
      matched: channelIds.length > 0,
      url: location.href,
      checkedAt: Date.now()
    };

    window[CACHE_KEY] = payload;
    return payload;
  }

  // 首次加载和 SPA 路由变化后都尝试更新。
  function refresh() {
    try {
      detectFromCurrentPage();
    } catch (error) {
      window[CACHE_KEY] = {
        channelIds: [],
        matched: false,
        url: location.href,
        checkedAt: Date.now(),
        error: String(error)
      };
    }
  }

  refresh();

  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (lastUrl !== location.href) {
      lastUrl = location.href;
      setTimeout(refresh, 400);
      setTimeout(refresh, 1200);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || message.type !== "GET_CHANNEL_IDS") {
      return;
    }

    const payload = refresh() || window[CACHE_KEY] || detectFromCurrentPage();
    sendResponse(payload);
  });
})();
