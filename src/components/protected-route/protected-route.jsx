import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Profile } from "../../pages/paths";
import { getCookie } from "../../services/cookies";

function ProtectedRouteElement({ path, children }) {
    const { auth } = useSelector(store => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }
    }, [auth, navigate]);

    return <Profile path={path}>{children}</Profile>;
}

export default ProtectedRouteElement;