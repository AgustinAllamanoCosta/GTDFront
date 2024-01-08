export const configuration = {
  clientId: process.env.VITE_CLEINT_ID ? process.env.VITE_CLEINT_ID : undefined,
  environment: process.env.APP_ENV ? process.env.APP_ENV : '',
  accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : '',
  id: process.env.ID ? process.env.ID : '',
  name: process.env.NAME ? process.env.NAME : '',
  photoURL: process.env.PHOTO_URL ? process.env.PHOTO_URL : '',
};
