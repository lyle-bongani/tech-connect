// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
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
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

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
  const userRef = doc(db, 'Users', user.uid);
  await setDoc(userRef, userData);

  // Create empty collections for user's data
  const connectionsRef = doc(db, 'Connections', user.uid);
  await setDoc(connectionsRef, { 
    userConnections: [],
    createdAt: serverTimestamp()
  });

  const notificationsRef = doc(db, 'Notifications', user.uid);
  await setDoc(notificationsRef, {
    notifications: [],
    lastChecked: serverTimestamp()
  });

  const userInterestsRef = doc(db, 'UserInterests', user.uid);
  await setDoc(userInterestsRef, {
    interests: [],
    updatedAt: serverTimestamp()
  });

  return userData;
};

// Authentication functions with Firestore integration
export const signUp = async (email: string, password: string, fullName: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDataInFirestore(userCredential.user, fullName);
  return userCredential.user;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const userDoc = await getDoc(doc(db, 'Users', user.uid));
  if (!userDoc.exists()) return null;

  return userDoc.data() as UserData;
};

export const updateUserData = async (userId: string, data: Partial<UserData>): Promise<void> => {
  try {
    const userRef = doc(db, 'Users', userId);
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
  await signOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, 
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
    await sendPasswordResetEmail(auth, email);
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