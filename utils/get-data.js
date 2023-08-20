function getStoredVariable(variable) {
  return new Promise((resolve) => {
    chrome.storage.local.get([variable], (result) => {
      const myStoredVariable = result[variable];
      resolve(myStoredVariable);
    });
  });
}

export function getApplicationDetailURLs() {
  if (!window.location.href.includes("https://apkmody.io")) {
    console.log("Khong phai website https://apkmody.io");
    return [];
  }

  console.log("Dang scrape data tu website https://apkmody.io");

  chrome.storage.local.get(["lastPage"]).then((lastPage) => {
    console.log("lastPage", lastPage);
  });

  const articleElements = document.querySelectorAll(".flex-item");
  const hrefList = [];

  articleElements.forEach((article) => {
    const linkElement = article.querySelector("a");
    const href = linkElement.getAttribute("href");
    hrefList.push(href);
  });
  console.log("In function getApplicationDetailURLs hrefList", hrefList);
  return {
    categoryUrl: window.location.href.split("?")[0],
    hrefList,
  };
}
