import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
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
  loginWithGoogle: () => Promise<void>;
  loginWithPassword: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const PASSWORD_ADMIN_USERNAME = 'admin@nozomicare.vn';
const PASSWORD_ADMIN_EMAIL = 'admin@nozomicare.vn';

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

  const assertAdmin = async (firebaseUser: User) => {
    if (!firebaseUser.email) {
      throw new Error('auth/unauthorized');
    }

    const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.email));
    if (!adminDoc.exists()) {
      await signOut(auth);
      throw new Error('auth/unauthorized');
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await assertAdmin(result.user);
  };

  const loginWithPassword = async (username: string, password: string) => {
    if (username.trim().toLowerCase() !== PASSWORD_ADMIN_USERNAME) {
      throw new Error('auth/invalid-credential');
    }

    const result = await signInWithEmailAndPassword(
      auth,
      PASSWORD_ADMIN_EMAIL,
      password,
    );
    await assertAdmin(result.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      loginWithGoogle,
      loginWithPassword,
      logout,
    }}>
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
