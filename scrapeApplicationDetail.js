import { getApplicationDetailData } from './utils/getDataApplicationDetail.js';
import { api } from './utils/api.js';
import { getStoredVariable, storeVariable } from './utils/local-storage.js';
storeVariable('APPLICATION_URLS', []).then((r) => 
  chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      func: getApplicationDetailData,
      args: [] // No arguments needed for the function call
    }, async (results) => {
      let urls = (await getStoredVariable('APPLICATION_URLS')) || [];
      if (urls.length === 0) {
        urls = (await api.getApplicationUrls({limit: 10})).map(path => 'https://apkmody.io' + path);
      }
      console.log('results', results);
      const data = results[0].result;
      if (data.error) {
        urls.pop();
        let url = urls[urls.length - 1];
        await api.markErrorUrl(url.split('https://apkmody.io')[1]);
        chrome.tabs.update(details.tabId, { url });
      }
      if (!data.packageName) return;
    
      if (urls.length === 0) {
        urls = (await api.getApplicationUrls({limit: 10})).map(path => 'https://apkmody.io' + path);
      } else {
        let url = urls.pop();
        console.log('CURRENT_URL', url);
        data.url = url.split('https://apkmody.io')[1] || data.url;
        await api.storeApplicationDetailData(data);
      }
      console.log('urls', urls);
      if (urls.length === 0) {
        urls = (await api.getApplicationUrls({limit: 10})).map(path => 'https://apkmody.io' + path);
      }
      let url = urls[urls.length - 1];
      await storeVariable('APPLICATION_URLS', urls);
      chrome.tabs.update(details.tabId, { url });
    });
  })
)