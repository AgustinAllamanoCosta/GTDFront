import { Configuration } from "../types/types";

export const configuration: Configuration = {
  clientId: import.meta.env.VITE_CLIENT_ID
    ? import.meta.env.VITE_CLIENT_ID
    : undefined,
  environment: import.meta.env.VITE_APP_ENV ? import.meta.env.VITE_APP_ENV : '',
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
    ? import.meta.env.VITE_ACCESS_TOKEN
    : '',
  id: import.meta.env.VITE_ID ? import.meta.env.VITE_ID : '',
  name: import.meta.env.VITE_NAME ? import.meta.env.VITE_NAME : '',
  photoURL: import.meta.env.VITE_PHOTO_URL
    ? import.meta.env.VITE_PHOTO_URL
    : '',
  ID: import.meta.env.VITE_ID ? import.meta.env.VITE_ID : '',
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUACKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  refreshTimeOut: import.meta.env.VITE_REFRESH_TIMEOUT
    ? +import.meta.env.VITE_REFRESH_TIMEOUT
    : undefined,
  openAIAPIKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  openAIModel: import.meta.env.VITE_OPEN_AI_MODE
};
