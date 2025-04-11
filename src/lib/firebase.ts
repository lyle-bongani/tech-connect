// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  collection,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

// User type definition
export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  role?: string;
  phoneNumber?: string;
  connections?: number;
  groupProjects?: number;
  profileImage?: string;
  interests?: string[];
  bio?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin: Timestamp;
  emailVerified: boolean;
}

// Helper function to create user data in Firestore
const createUserDataInFirestore = async (user: User, fullName: string = ''): Promise<UserData> => {
  const userData: UserData = {
    uid: user.uid,
    email: user.email!,
    fullName: fullName || user.email!.split('@')[0], // Use email prefix if no name provided
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
export const signUp = async (email: string, password: string, fullName: string): Promise<UserData> => {
  try {
    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Create user data object
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      fullName,
      role: 'New Member',
      connections: 0,
      groupProjects: 0,
      profileImage: '/images/Ellipse 13.png', // Default profile image
      interests: [],
      bio: '',
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
      lastLogin: serverTimestamp() as Timestamp,
      emailVerified: false
    };

    try {
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
    } catch (error) {
      // If Firestore operations fail, delete the auth user
      console.error('Firestore Error during signup:', error);
      await user.delete();
      throw new Error('Failed to create user profile. Please try again. If the problem persists, contact support.');
    }
  } catch (error: any) {
    console.error('Auth Error during signup:', error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please try logging in instead.');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address. Please check and try again.');
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    }
    throw new Error(error.message || 'Failed to create account. Please try again.');
  }
};

export const signIn = async (email: string, password: string): Promise<UserData> => {
  try {
    // Sign in user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      // Fetch user data from Firestore
      const userRef = doc(db, 'Users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        console.log('Attempting to recreate missing user profile for:', user.uid);
        // If Firestore data doesn't exist, try to recreate it
        try {
          const userData = await createUserDataInFirestore(user);
          console.log('Successfully recreated user profile');
          return userData;
        } catch (recreateError) {
          console.error('Failed to recreate user profile:', recreateError);
          await signOut(auth);
          throw new Error('Failed to restore your profile. Please contact support.');
        }
      }

      const userData = userDoc.data() as UserData;

      // Verify email matches
      if (userData.email !== user.email) {
        console.error('Email mismatch - Auth:', user.email, 'Firestore:', userData.email);
        await signOut(auth);
        throw new Error('Account mismatch. Please contact support.');
      }

      // Update last login and email verification status
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        emailVerified: user.emailVerified
      });

      return {
        ...userData,
        emailVerified: user.emailVerified
      };
    } catch (firestoreError) {
      console.error('Firestore error during sign in:', firestoreError);
      throw firestoreError;
    }
  } catch (error: any) {
    console.error('Error during sign in:', error);
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please sign up first.');
    }
    if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    }
    throw error;
  }
};

export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, 'Users', user.uid));
    if (!userDoc.exists()) return null;
    return userDoc.data() as UserData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUserData = async (userId: string, data: Partial<UserData>): Promise<void> => {
  try {
    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    }
    throw new Error('Failed to send password reset email. Please try again.');
  }
};