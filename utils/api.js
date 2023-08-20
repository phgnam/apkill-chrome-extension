// import { CONSTANT } from './constant';
const CONSTANT = {
  // API
  API_URL: 'http://localhost:3000',
  PATH_GET_CATEGORY_LIST: 'category',
  PATH_STORE_APPLICATION_URLS: 'category/store-application-urls',
  PATH_STORE_APPLICATION_DETAIL_DATA: 'app',
  PATH_GET_APPLICATION_URLS: 'app',
  PATH_MARK_ERROR_URL: 'app/mark-error',
  PATH_MARK_ERROR_APP_VERSION_URL: 'app/mark-error-app-version',
  PATH_LIST_APP_VERSIONS_URL: 'app/app-versions',
  PATH_UPDATE_DOWNLOAD_URL_APP_VERSION_URL: 'app/update-download-url-app-version',
}
function getFullUrl(path) {
  return CONSTANT.API_URL + '/' + path;
}
// Helper function to handle JSON responses from the server
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'An error occurred.');
    error.statusCode = response.status;
    throw error;
  }
  return response.json();
}

// Common API methods
const apiDefault = {
  get: async (url, headers = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...headers,
        },
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  async getWithQuery(url, query = {}, headers = {}) {
    try {
      const queryString = Object.keys(query)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');

      const fullUrl = `${url}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          ...headers,
        },
      });

      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}, headers = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}, headers = {}) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

export const api = {
  getCategoryList: async () => {
    return await apiDefault.get(getFullUrl(CONSTANT.PATH_GET_CATEGORY_LIST));
  },

  storeApplicationUrls: async (categoryUrl, applicationUrls) => {
    return await apiDefault.post(getFullUrl(CONSTANT.PATH_STORE_APPLICATION_URLS), {
      categoryUrl,
      applicationUrls,
    });
  },

  storeApplicationDetailData: async (data) => {
    return await apiDefault.post(getFullUrl(CONSTANT.PATH_STORE_APPLICATION_DETAIL_DATA), data);
  },

  getApplicationUrls: async (query) => {
    return await apiDefault.getWithQuery(getFullUrl(CONSTANT.PATH_GET_APPLICATION_URLS), query);
  },

  markErrorUrl: async (url) => {
    return await apiDefault.post(getFullUrl(CONSTANT.PATH_MARK_ERROR_URL), {url});
  },

  listAppVersions: async (query) => {
    return await apiDefault.getWithQuery(getFullUrl(CONSTANT.PATH_LIST_APP_VERSIONS_URL), query);
  },

  markErrorAppVersion: async (url) => {
    return await apiDefault.post(getFullUrl(CONSTANT.PATH_MARK_ERROR_APP_VERSION_URL), {url});
  },

  updateDownloadUrl: async (data) => {
    await apiDefault.post(getFullUrl(CONSTANT.PATH_UPDATE_DOWNLOAD_URL_APP_VERSION_URL), data);
    return;
  },
}