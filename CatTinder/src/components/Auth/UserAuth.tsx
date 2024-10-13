import React, { useEffect, useState } from 'react';
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface UserAuthProps {
    returnToPreferences: () => void;
    displayReturnToPreferences: boolean;    
}

const UserAuth: React.FC<UserAuthProps> = (props: UserAuthProps) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                console.log('User is signed in');
            } else {
                setAuthUser(null);
            }
        });

        // Cleanup function
        return () => {
            unsubscribe();
        };
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
            {authUser 
                ? <>
                    <p>{`Signed In as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                    {props.displayReturnToPreferences && <button onClick={props.returnToPreferences}>Return to Preferences</button>}
                  </> 
                : <p>Welcome!</p>}
        </div>
    );
}

export default UserAuth;