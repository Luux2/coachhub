import {createContext, FC, ReactNode, useContext, useEffect, useState, useCallback} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {get, ref} from "firebase/database";
import {auth, database} from "../../firebase.ts";
import {UserInterface} from "../utils/interfaces.ts";

interface AuthContextType {
    user: UserInterface | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const handleAuthChange = useCallback((firebaseUser: User | null) => {
        if (firebaseUser) {
            const usersRef = ref(database, 'users');
            get(usersRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const users = snapshot.val() as Record<string, UserInterface>;
                    const userData = Object.entries(users).find(([_, user]) => user.uid === firebaseUser.uid);
                    if (userData) {
                        const [, users] = userData;
                        const userWithId = {...users, id: userData[0]};
                        setUser(userWithId);
                    } else {
                        console.error("User data not found in database for UID:", firebaseUser.uid);
                        setUser(null);
                    }
                } else {
                    console.error("No users found in the database");
                    setUser(null);
                }
                setLoading(false);
            });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
        return () => unsubscribe();
    }, [handleAuthChange]);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within an AuthProvider");
    }
    return context;
};