import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // Adjust the import path as necessary

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// Define the UserContextType interface
export interface UserContextType {
  user: User | null;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isRider: boolean;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          name: userData.name ?? '',
          role: userData.role ?? '',
        });
      } else {
        console.warn('User document does not exist in Firestore.');
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          name: '',
          role: 'user', // Default role
        });
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  // Auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserData(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isRider = user?.role === 'rider';

  // Context value
  const value: UserContextType = {
    user,
    logout,
    isAuthenticated,
    isAdmin,
    isRider,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;