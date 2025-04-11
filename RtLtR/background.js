// فقط برای پیام‌رسانی استفاده می‌شود
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleRTL") {
    sendResponse({status: "ready"});
  }
});
