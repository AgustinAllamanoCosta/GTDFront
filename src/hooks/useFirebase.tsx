import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../assets/google/firebase';
import { Analytics, getAnalytics } from 'firebase/analytics';

type FirebaseData = {
  useFireBase: Firestore;
  analytics: Analytics | undefined;
};
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseData: FirebaseData = {
  analytics: undefined,
  useFireBase: getFirestore(firebaseApp),
};

if (firebaseConfig.projectId) {
  firebaseData.analytics = getAnalytics(firebaseApp);
}
