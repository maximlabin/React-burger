import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedRouteElement({ children }: PropsWithChildren) {
    const { auth } = useSelector((store: any) => store.user);
    const navigate = useNavigate();
    const location = useLocation();

    if (!auth) {
        navigate("/login", { state: { from: location } });
        return null;
    }

    return <>{children}</>;
}


export default ProtectedRouteElement;