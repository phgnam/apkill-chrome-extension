function getListHistoryVersions() {
  const versionCards = document.querySelectorAll('.version-card');
  const versionList = [];

  versionCards.forEach((card) => {
    const versionTitleElement = card.querySelector('.version-card-content--title');
    const versionLinkElement = card.querySelector('a[href^="/games/toca-life-world/history/"]');

    if (versionTitleElement && versionLinkElement) {
      const versionTitle = versionTitleElement.textContent.trim();
      const versionUrl = versionLinkElement.getAttribute('href');
      const versionNumberMatch = versionTitle.match(/\d+\.\d+(\.\d+)?/);
      const versionNumber = versionNumberMatch ? versionNumberMatch[0] : null;

      if (versionNumber && versionUrl) {
        versionList.push({ versionNumber, url: versionUrl });
      }
    }
  });
  return versionList
}

function getDownloadLink() {
  // Get the link element
  const downloadLinkElement = document.querySelector(".wp-block-button__link");
  // Get the "href" attribute value from the link element
  const downloadLink = downloadLinkElement ? downloadLinkElement.href : null;
  return downloadLink;
}

function getContent() {
  const entryContentElement = document.querySelectorAll(
    ".entry-block.entry-content.main-entry-content"
  )[1];
  const completeHTML = entryContentElement ? entryContentElement.innerHTML : "";
  const howToDownloadIndex = completeHTML.indexOf("<h2>How to download");
  const content = completeHTML.substring(0, howToDownloadIndex);
  return content;
}

function getUpdatedAt() {
  const updatedTimeElement = document.querySelector('time[datetime]');
  return updatedTimeElement ? updatedTimeElement.getAttribute('datetime') : null;
}

function getDetail() {
  const appDetails = {};
  const tableRows = document.querySelectorAll(
    "table.has-fixed-layout tbody tr"
  );

  tableRows.forEach((row) => {
    const header = row.querySelector("th");
    const cell = row.querySelector("td");

    if (!header || !cell) {
      // Skip this row if either header or cell is missing
      return;
    }

    const key = header.textContent.trim();
    let value = cell.textContent.trim();

    if (key === "Package Name") {
      const packageLink = cell.querySelector("a");
      appDetails.packageName = value;
      appDetails.packageURL = packageLink ? packageLink.href : null;
    // } else if (key === "Category") {
    //   const categoryLink = cell.querySelector("a");
    //   appDetails.category = value
    //     .replace(categoryLink.textContent.trim(), "")
    //     .trim();
    //   appDetails.categoryURL = categoryLink ? categoryLink.href : null;
    } else if (key === "MOD Features") {
      appDetails.modFeatures = value;
    } else if (key === "Version") {
      appDetails.version = value;
    } else if (key === "Size") {
      appDetails.size = value;
    } else if (key === "Price") {
      appDetails.price = value;
    } else if (key === "Requires") {
      appDetails.requires = value;
    } else if (key === "Original APK") {
      const apkLink = cell.querySelector("a");
      appDetails.originalAPK = apkLink ? apkLink.href : null;
    } else if (key === "Publisher") {
      const publisherLink = cell.querySelector("a");
      appDetails.publisher = publisherLink
        ? publisherLink.textContent.trim()
        : null;
    } else if (key === "Name") {
      appDetails.name = value;
    }
  });

  return appDetails;
}

export function getApplicationDetailData() {
  if (!window.location.href.includes("https://apkmody.io")) {
    console.log("Khong phai website https://apkmody.io");
    return {};
  }
  if (document.documentElement.outerHTML.includes('UNAVAILABLE:')
  || document.documentElement.outerHTML.includes('DEADLINE_EXCEEDED')) {
    return {error: true};
  }

  console.log("Dang scrape data tu website https://apkmody.io");

  setInterval(() => {
    // Find the checkbox element
    const checkbox = document.querySelector('.ctp-checkbox-container input[type="checkbox"]');

    // Check if the checkbox is not already checked
    if (checkbox && !checkbox.checked) {
      // Trigger a click event on the checkbox
      checkbox.click();
    }
  }, 5000);

  function getAppIconUrl() {
    const appIconElement = document.querySelector('div.app-icon img');
    return appIconElement.src;
  }

  function getListHistoryVersions() {
    const versionCards = document.querySelectorAll('.version-card');
    const versionList = [];
  
    versionCards.forEach((card) => {
      const versionTitleElement = card.querySelector('.version-card-content--title');
      const versionLinkElement = card.querySelector(`a[href^="${window.location.href.split("?")[0].split("https://apkmody.io")[1]}/history/"]`);
  
      if (versionTitleElement && versionLinkElement) {
        const versionTitle = versionTitleElement.textContent.trim();
        const versionUrl = versionLinkElement.getAttribute('href');
        const versionNumberMatch = versionTitle.match(/\d+\.\d+(\.\d+)?/);
        const versionNumber = versionNumberMatch ? versionNumberMatch[0] : null;
  
        if (versionNumber && versionUrl) {
          versionList.push({ versionNumber, url: versionUrl });
        }
      }
    });
    return versionList.length ? [versionList[0]] : [];
  }
  
  function getDownloadLink() {
    // Get the link element
    const downloadLinkElement = document.querySelector(".wp-block-button__link");
    // Get the "href" attribute value from the link element
    const downloadLink = downloadLinkElement ? downloadLinkElement.href : null;
    return downloadLink;
  }
  
  function getContent() {
    const entryContentElement = document.querySelectorAll(
      ".entry-block.entry-content.main-entry-content"
    )[1];
    const completeHTML = entryContentElement ? entryContentElement.innerHTML : "";
    const howToDownloadIndex = completeHTML.indexOf("<h2>How to download");
    const content = completeHTML.substring(0, howToDownloadIndex);
    return content;
  }
  
  function getUpdatedAt() {
    const updatedTimeElement = document.querySelector('time[datetime]');
    return updatedTimeElement ? updatedTimeElement.getAttribute('datetime') : null;
  }
  
  function getDetail() {
    const appDetails = {};
    const tableRows = document.querySelectorAll(
      "table.has-fixed-layout tbody tr"
    );
  
    tableRows.forEach((row) => {
      const header = row.querySelector("th");
      const cell = row.querySelector("td");
  
      if (!header || !cell) {
        // Skip this row if either header or cell is missing
        return;
      }
  
      const key = header.textContent.trim();
      let value = cell.textContent.trim();
  
      if (key === "Package Name") {
        const packageLink = cell.querySelector("a");
        appDetails.packageName = value;
        appDetails.packageURL = packageLink ? packageLink.href : null;
      // } else if (key === "Category") {
      //   const categoryLink = cell.querySelector("a");
      //   appDetails.category = value
      //     .replace(categoryLink.textContent.trim(), "")
      //     .trim();
      //   appDetails.categoryURL = categoryLink ? categoryLink.href : null;
      } else if (key === "MOD Features") {
        appDetails.modFeatures = value;
      } else if (key === "Version") {
        appDetails.version = value;
      } else if (key === "Size") {
        appDetails.size = value;
      } else if (key === "Price") {
        appDetails.price = value;
      } else if (key === "Requires") {
        appDetails.requires = value;
      } else if (key === "Original APK") {
        const apkLink = cell.querySelector("a");
        appDetails.originalAPK = apkLink ? apkLink.href : null;
      } else if (key === "Publisher") {
        const publisherLink = cell.querySelector("a");
        appDetails.publisher = publisherLink
          ? publisherLink.textContent.trim()
          : null;
      } else if (key === "Name") {
        appDetails.name = value;
      }
    });
  
    return appDetails;
  }
  const result = {
    url: decodeURI(window.location.href.split("?")[0].split("https://apkmody.io")[1]),
    appIconUrl: getAppIconUrl(),
    ...getDetail(),
    content: getContent(),
    versions: getListHistoryVersions(),
    updatedAt: getUpdatedAt(),
  }
  console.log('RESULT', result);
  return result;
}