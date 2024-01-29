import { configuration } from '../../config/appConfig';

export const firebaseConfig = {
  apiKey: configuration.apiKey,
  authDomain: configuration.authDomain,
  projectId: configuration.projectId,
  storageBucket: configuration.storageBucket,
  messagingSenderId: configuration.messagingSenderId,
  appId: configuration.appId,
  measurementId: configuration.measurementId,
};
