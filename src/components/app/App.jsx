import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/getIngredients";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { HomePage, PageNotFound, Register, Login, ForgotPassword, ResetPassword, Profile } from "../../pages/paths";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route/protected-route";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from '../modal/modal';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let state = location.state;
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
                <Route path="/login" element={<Login />} exact={true} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRouteElement />} />
                <Route path="profile/order" element={<ProtectedRouteElement />} />
                <Route path="/ingredients/:_id" element={<IngredientDetails head={'Детали ингредиента'} />} />
                <Route path="*" element={<PageNotFound exact={true} />} />
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