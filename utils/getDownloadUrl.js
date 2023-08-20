export function getDownloadUrl() {
  if (!window.location.href.includes("https://apkmody.io")) {
    console.log("Khong phai website https://apkmody.io");
    return {};
  }
  if (document.documentElement.outerHTML.includes('UNAVAILABLE:')
  || document.documentElement.outerHTML.includes('DEADLINE_EXCEEDED')) {
    return {error: true};
  }

  console.log("Dang scrape data tu website https://apkmody.io");

  var downloadButton = document.getElementById("download-button");
  let downloadUrl;
  if (downloadButton) {
    downloadUrl = downloadButton.getAttribute("href");
    console.log("Download Link: " + downloadUrl);
  } else {
    console.log("Download link not found.");
  }
  const result = {
    url: decodeURI(window.location.href.split("?")[0].split("https://apkmody.io")[1]),
    downloadUrl,
  };
  console.log(result);
  return result;
}