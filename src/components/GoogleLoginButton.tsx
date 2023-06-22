import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { firebase } from '../firebaseConfig';
import { useEffect, useState } from 'react';

const auth = getAuth(firebase);

const GoogleLoginButton = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    console.log('auth', auth);
    signInWithPopup(auth, provider)
      // .signInWithPopup(provider)
      .then((result: any) => {
        // Handle successful login
        const user = result.user;
        console.log('Logged in user:', user);
        setCurrentUser(user);
      })
      .catch((error: any) => {
        // Handle login error
        console.error('Google login error:', error);
      });
  };

  const handleGoogleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Handle successful logout
        console.log('User logged out');
        setCurrentUser(null);
        // Redirect to the desired page after logout
      })
      .catch((error) => {
        // Handle logout error
        console.error('Logout error:', error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can access the user data here
        console.log('Logged in user from auth state:', user);
        // setCurrentUser(user);

        // Redirect to desired page after successful login
      } else {
        // User is not signed in
        console.log('User is not signed in');
        // Handle the case if the user is not signed in
      }
    });
  }, []);

  if (!currentUser)
    return (
      <button
        onClick={handleGoogleLogin}
        className='bg-blue-500 rounded-sm text-white p-2'
      >
        Sign in with Google
      </button>
    );

  return (
    <button
      onClick={handleGoogleLogout}
      className='bg-yellow-500 rounded-sm text-white p-2 flex items-center gap-3'
    >
      Logout
      <img
        src={currentUser.photoURL}
        alt='Your Image'
        className='rounded-full w-8 h-8'
      />
    </button>
  );
};

export default GoogleLoginButton;
