import {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useUserData} from '../context/AuthContext';
import LoadingBar from "../components/misc/LoadingBar.tsx";


interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const {user, loading} = useUserData(); // Hent brugerdata og loading fra AuthContext

    if (loading) {
        return <LoadingBar/>;
    }

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;