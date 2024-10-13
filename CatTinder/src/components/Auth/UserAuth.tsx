import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from './firebase';
import { onAuthStateChanged, signOut }from 'firebase/auth';

const UserAuth: React.FC = () => {

    const [authUser, setAuthUser] = useState<firebase.User | null>(null);
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                console.log('User is signed in');
            } else {
                setAuthUser(null)
            }
        });
        return () => {listen();}
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    }

    return (
        <div>
            {authUser ? <><p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <p>Welcome!</p>}
        </div>
    );
}

export default UserAuth;