import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [isBlocked, setBlocked] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, type, age, phone, address, area, profilePicture, nidPicture, license, carInformation, category, status, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, type, age, phone, address, area, profilePicture, nidPicture, license, carInformation, category, status };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, type, age, phone, address, area, profilePicture, nidPicture, license, carInformation, category, status, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const registerLearner = (email, password, name, type, age, phone, address, area, profilePicture, nidPicture, category, status, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, type, age, phone, address, area, profilePicture, nidPicture, category, status };
                setUser(newUser);
                // save user to the database
                saveLearner(email, name, type, age, phone, address, area, profilePicture, nidPicture, category, status, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        if (email && !isBlocked) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const destination = location?.state?.from || '/';
                    history.replace(destination);
                    setAuthError('');
                })
                .catch((error) => {
                    setAuthError(error.message);
                })
                .finally(() => setIsLoading(false));

        }

    }

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');
                setAuthError('');
                const destination = location?.state?.from || '/';
                history.replace(destination);
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        console.log(idToken);
                        setToken(idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    // useEffect(() => {
    //     fetch(`http://localhost:5000/users/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data.admin))
    // }, [user.email])


    useEffect(() => {
        fetch(`https://evening-harbor-12084.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {

                setAdmin(data.admin);
                setBlocked(data.isBlocked);
            })
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, type, age, phone, address, area, profilePicture, nidPicture, license, carInformation, category, status, method) => {
        const user = { email, displayName, type, age, phone, address, area, profilePicture, nidPicture, license, carInformation, category, status };
        fetch('https://evening-harbor-12084.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    const saveLearner = (email, displayName, type, age, phone, address, area, profilePicture, nidPicture, category, status, method) => {
        const user = { email, displayName, type, age, phone, address, area, profilePicture, nidPicture, category, status };
        fetch('https://evening-harbor-12084.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
        token,
        isLoading,
        authError,
        isBlocked,
        registerUser,
        registerLearner,
        loginUser,
        signInWithGoogle,
        logout,
    }
}

export default useFirebase;