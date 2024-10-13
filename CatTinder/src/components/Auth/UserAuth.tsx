import React, { useEffect} from 'react';
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface UserAuthProps {
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
    returnToPreferences: () => void;
    displayReturnToPreferences: boolean;    
}

const UserAuth: React.FC<UserAuthProps> = (props: UserAuthProps) => {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                props.setAuthUser(user);
                console.log('User is signed in');
            } else {
                props.setAuthUser(null);
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
            {props.authUser 
                ? <>
                    <p>{`Signed In as ${props.authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                    {props.displayReturnToPreferences && <button onClick={props.returnToPreferences}>Return to Preferences</button>}
                  </> 
                : <p>Welcome!</p>}
        </div>
    );
}

export default UserAuth;