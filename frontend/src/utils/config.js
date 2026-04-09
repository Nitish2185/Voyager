const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const BASE_URL = trimTrailingSlash(API_URL);

export const getApiUrl = (path = "") => {
  if (!path) return BASE_URL;
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export const getAssetUrl = (path = "") => {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${BASE_URL}/${normalizedPath}`;
};
