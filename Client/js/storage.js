export async function getStoredApiKey() {
  const result = await chrome.storage.sync.get(['openaiApiKey']);
  return result.openaiApiKey;
}

export async function setStoredApiKey(apiKey) {
  await chrome.storage.sync.set({ openaiApiKey: apiKey });
}