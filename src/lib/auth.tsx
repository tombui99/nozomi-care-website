import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.email));
        if (adminDoc.exists()) {
          setUser(firebaseUser);
          setIsAdmin(true);
        } else {
          // If not an admin, sign out immediately
          await signOut(auth);
          setUser(null);
          setIsAdmin(false);
          alert("Tài khoản của bạn không có quyền truy cập vào hệ thống này.");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      
      if (loggedInUser && loggedInUser.email) {
        const adminDoc = await getDoc(doc(db, 'admins', loggedInUser.email));
        if (!adminDoc.exists()) {
          await signOut(auth);
          throw new Error("Unauthorized email access.");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Let the onAuthStateChanged handle UI alerts or throw if needed
      if (error instanceof Error && error.message === "Unauthorized email access.") {
        alert("Email này chưa được cấp quyền quản trị.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
