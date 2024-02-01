import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../assets/google/firebase';
import { getAnalytics } from 'firebase/analytics';
const firebaseApp = initializeApp(firebaseConfig);
const useFireBase = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);

export default useFireBase;
