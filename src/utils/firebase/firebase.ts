import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { type } from 'os';
import { Category } from '../../store/categories/category-types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

// List of providers, facebook, github etc.
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type objectsToAdd = {
  title: string
}

export const addCollectionAndDocument = async <T extends objectsToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
   const collectionRef = collection(db, collectionKey)
   const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  });
  await batch.commit();
  console.log('done');
};

export const getCollectionAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  // await Promise.reject(new Error('New error OOPS')); // generate errors for testing
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

export type additionalInformation = {
  // ? is optional
  displayName?: string
}

export type userData = {
  createdAt: Date,
  diplayName: string,
  email: string
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as additionalInformation
): Promise<void | QueryDocumentSnapshot<userData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid)

  const userSnapShop = await getDoc(userDocRef)

  if (!userSnapShop.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapShop as QueryDocumentSnapshot<userData>;
};

export const createUserAuthWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInUserAuthWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
};

export const SignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unSubscribe();
        resolve(userAuth)
      },
      reject
    )
  })
}