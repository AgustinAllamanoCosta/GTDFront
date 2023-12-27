import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../assets/google/firebase';
const firebaseApp = initializeApp(firebaseConfig);
const useFireBase = getFirestore(firebaseApp);
export default useFireBase;
