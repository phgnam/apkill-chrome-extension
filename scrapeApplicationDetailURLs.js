import { getApplicationDetailURLs } from './utils/get-data.js';
import { api } from './utils/api.js';
export function scrapeApplicationDetailURLs(details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    func: getApplicationDetailURLs,
    args: [] // No arguments needed for the function call
  }, async (results) => {
    const {categoryUrl, hrefList} = results[0].result;
    if (hrefList.length === 0) return;

    console.log('categoryUrl, hrefList', categoryUrl, hrefList);
    const categories = await api.getCategoryList();
    const currentCategoryScraping = categories.find(category => category.url === categoryUrl);
    console.log('currentCategoryScraping', currentCategoryScraping);
    let nextCategoryScrape = categories.find(category => category.total > category.completedItems && category.url !== currentCategoryScraping.url);
    console.log('nextCategoryScrape', nextCategoryScrape);
    if (!currentCategoryScraping) return;
    if (currentCategoryScraping.total <= currentCategoryScraping.completedItems) {
      nextCategoryScrape = categories.find(category => category.total > category.completedItems);
      if (!nextCategoryScrape) alert('SCRAPE COMPLETED!!!!!!!');
      chrome.tabs.update(details.tabId, { url: nextCategoryScrape.url });
      return;
    }
    const totalPage = Math.ceil(currentCategoryScraping.total / 12);
    const lastPageInLocalStorage = Math.floor(currentCategoryScraping.completedItems / 12) //await localStorage.getStoredVariable('lastPage');
    let lastPage = lastPageInLocalStorage || 1;
    console.log('lastPage', lastPage);
    // const listApplicationUrls = hrefList;
    // await localStorage.storeVariable('listApplicationUrls', listApplicationUrls);
    await api.storeApplicationUrls(currentCategoryScraping.url, hrefList);
    // Now you have the hrefList returned from getApplicationDetailURLs
    
    // You can do whatever you want with the list here
    console.log('log in background', hrefList);
    // await localStorage.storeVariable('lastPage', lastPage+1)
    if (lastPage < totalPage) {
      chrome.tabs.update(details.tabId, { url: currentCategoryScraping.url + '?page=' + lastPage++ });
    } else {
      chrome.tabs.update(details.tabId, { url: nextCategoryScrape.url });
    }
  });
}