import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../services/types';

function ProtectedRouteElement({ children }: PropsWithChildren) {
    const { auth } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!auth) {
            navigate("/login", { state: { from: location } });
        }
    }, []);

    return <>{children}</>;
}


export default ProtectedRouteElement;