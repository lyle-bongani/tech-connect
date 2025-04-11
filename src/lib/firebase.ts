// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  AuthError
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  DocumentData,
  FirestoreError
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCaSNHaWjZyTKL7tZLKzN5YnXbXKoZMM8",
  authDomain: "tech-connect-469c7.firebaseapp.com",
  projectId: "tech-connect-469c7",
  storageBucket: "tech-connect-469c7.firebasestorage.app",
  messagingSenderId: "910311971615",
  appId: "1:910311971615:web:b61f4d435a7184f2e82e2a",
  measurementId: "G-CZJ4E8HP59"
};

// Initialize Firebase
function initializeFirebase() {
  try {
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}

// Initialize Firebase app
const app = initializeFirebase();

// Initialize Firebase services
const auth = typeof window !== 'undefined' ? getAuth(app) : null;
const db = typeof window !== 'undefined' ? getFirestore(app) : null;

// Ensure auth and db are initialized before use
const getFirebaseAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized or running on server side');
  }
  return auth;
};

const getFirebaseDb = () => {
  if (!db) {
    throw new Error('Firebase Firestore is not initialized or running on server side');
  }
  return db;
};

// User type definition
export interface UserData extends DocumentData {
  uid: string;
  email: string;
  fullName: string;
  role?: string;
  connections?: number;
  groupProjects?: number;
  profileImage?: string;
  interests?: string[];
  bio?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  lastLogin?: Timestamp;
  emailVerified?: boolean;
}

// Helper function to create user data in Firestore
const createUserDataInFirestore = async (user: User, fullName: string): Promise<UserData> => {
  const userData: UserData = {
    uid: user.uid,
    email: user.email!,
    fullName: fullName,
    role: 'New Member',
    connections: 0,
    groupProjects: 0,
    profileImage: '/images/Ellipse 13.png',
    interests: [],
    bio: '',
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    lastLogin: serverTimestamp() as Timestamp,
    emailVerified: user.emailVerified
  };

  // Store user data in Firestore
  const firestore = getFirebaseDb();
  const userRef = doc(firestore, 'Users', user.uid);
  await setDoc(userRef, userData);

  // Create empty collections for user's data
  const connectionsRef = doc(firestore, 'Connections', user.uid);
  await setDoc(connectionsRef, { 
    userConnections: [],
    createdAt: serverTimestamp()
  });

  const notificationsRef = doc(firestore, 'Notifications', user.uid);
  await setDoc(notificationsRef, {
    notifications: [],
    lastChecked: serverTimestamp()
  });

  const userInterestsRef = doc(firestore, 'UserInterests', user.uid);
  await setDoc(userInterestsRef, {
    interests: [],
    updatedAt: serverTimestamp()
  });

  return userData;
};

// Authentication functions with Firestore integration
export const signUp = async (email: string, password: string, fullName: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  await createUserDataInFirestore(userCredential.user, fullName);
  return userCredential.user;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  return userCredential.user;
};

export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const firestore = getFirebaseDb();
  const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
  if (!userDoc.exists()) return null;

  return userDoc.data() as UserData;
};

export const updateUserData = async (userId: string, data: Partial<UserData>): Promise<void> => {
  try {
    const firestore = getFirebaseDb();
    const userRef = doc(firestore, 'Users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    if (error instanceof FirestoreError) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred while updating user data');
  }
};

export const logOut = async (): Promise<void> => {
  await signOut(getFirebaseAuth());
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), 
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(getFirebaseAuth(), email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    if (error instanceof Error) {
      if ((error as AuthError).code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      }
    }
    throw new Error('Failed to send password reset email. Please try again.');
  }
};

export { auth, db };