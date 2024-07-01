import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../assets/google/firebase';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { configuration } from '../config/appConfig';
import { IS_END_TO_END, IS_LOCAL_TESTING } from '../constants/environment';

type FirebaseData = {
  useFireBase: Firestore;
  analytics: Analytics | undefined;
};
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseData: FirebaseData = {
  analytics: undefined,
  useFireBase: getFirestore(firebaseApp),
};

if (
  firebaseConfig.projectId &&
  configuration.environment != IS_END_TO_END &&
  configuration.environment != IS_LOCAL_TESTING
) {
  firebaseData.analytics = getAnalytics(firebaseApp);
}
