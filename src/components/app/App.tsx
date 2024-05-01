import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/getIngredients";
import { Routes, Route } from 'react-router-dom';
import { HomePage, PageNotFound, Register, Login, ForgotPassword, ResetPassword, Profile, Orders, Feed } from "../../pages/paths";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route/protected-route";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from '../modal/modal';
import InfoOrder from "../info-order/info-order";
import { useAppDispatch } from "../../hooks/useDispatch";;

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])
    const handleCloseModal = () => {
        navigate(-1);
    }
    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:number" element={<InfoOrder />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRouteElement><Profile /></ProtectedRouteElement>} />
                <Route path="/profile/orders" element={<ProtectedRouteElement><Orders /></ProtectedRouteElement>} />
                <Route path="/profile/orders/:number" element={<ProtectedRouteElement><InfoOrder /></ProtectedRouteElement>} />
                <Route path="/ingredients/:_id" element={<IngredientDetails head={'Детали ингредиента'} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path='/ingredients/:_id' element={
                        <Modal onClick={handleCloseModal}>
                            <IngredientDetails head={'Детали ингредиента'} />
                        </Modal>
                    } />

                </Routes>
            )
            }
        </div >
    );
}

export default App;