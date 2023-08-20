// Function to get the stored variable using async/await
export function getStoredVariable(variable) {
  return new Promise((resolve) => {
    chrome.storage.local.get([variable], (result) => {
      const myStoredVariable = result[variable];
      resolve(myStoredVariable);
    });
  });
}

// Function to store a variable using async/await
export function storeVariable(key, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
    });
  });
}