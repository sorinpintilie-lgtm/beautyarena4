import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        const userInfo = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || userData.name || firebaseUser.email.split('@')[0],
          phone: userData.phone || '',
          address: userData.address || '',
          createdAt: firebaseUser.metadata.creationTime,
        };

        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Autentificare reușită!');
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'Eroare la autentificare';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Utilizatorul nu există';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Parolă incorectă';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalid';
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name,
        email,
        phone: '',
        address: '',
        createdAt: new Date().toISOString(),
      });

      toast.success('Cont creat cu succes!');
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'Eroare la înregistrare';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email-ul este deja utilizat';
          break;
        case 'auth/weak-password':
          errorMessage = 'Parola trebuie să aibă cel puțin 6 caractere';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalid';
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Deconectare reușită');
    } catch (error) {
      toast.error('Eroare la deconectare');
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Nu ești autentificat' };

    try {
      // Update Firebase Auth profile if name is being updated
      if (updates.name) {
        await updateProfile(auth.currentUser, { displayName: updates.name });
      }

      // Update Firestore document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);

      // Update local state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      toast.success('Profil actualizat');
      return { success: true, user: updatedUser };
    } catch (error) {
      toast.error('Eroare la actualizarea profilului');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;