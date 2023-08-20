import { getApplicationDetailURLs } from './utils/get-data.js';
import { showLog } from './utils/logs.js';

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getApplicationDetailURLs,
  }, (results) => {
    showLog(results[0].result);
  });
});