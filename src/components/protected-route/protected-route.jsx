import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function ProtectedRouteElement({ children }) {
    const { auth } = useSelector(store => store.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!auth) {
            navigate("/login", { state: { from: location } });
        }
    }, [auth, navigate, location]);

    return auth ? children : <Navigate to="/login" state={{ from: location }} />;;
}

ProtectedRouteElement.propTypes = {
    children: PropTypes.node.isRequired,
};


export default ProtectedRouteElement;