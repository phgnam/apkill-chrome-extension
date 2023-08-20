export function showLog(data) {
  const eleShowLogs = document.getElementById('show-logs');
  const jsonString = JSON.stringify(data, null, 2);
  const preElement = document.createElement('pre');
  preElement.textContent = jsonString;
  eleShowLogs.appendChild(preElement);
}