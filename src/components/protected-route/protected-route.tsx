import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedRouteElement({ children }: PropsWithChildren) {
    const { auth } = useSelector((store) => store.user);
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