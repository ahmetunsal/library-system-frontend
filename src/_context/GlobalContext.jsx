import { createContext, useEffect, useState } from "react";
import { userObj } from "../utils/config";
import { getUserInfo, postTokenVerify, postUserLogin  } from "../_api/api";
import Toaster from "../components/Toaster";


export const context = createContext();


export const GlobalProvider = ({ children }) => {
    // User information
    const [user, setUser] = useState(userObj);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Alerts
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertType, setAlertType] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    

    useEffect(() => {
        verifyToken();
    }, []);
    
    const verifyToken = async () => {
        const isAuthenticated = await postTokenVerify();
        setIsLoggedIn(isAuthenticated)
        if (!isAuthenticated) return;

        const user = await getUserInfo();
        setUser(user);
    }

    const userLogin = async () => {
        postUserLogin(user.username, user.password);
        handleShowAlert("Başarıyla giriş yaptınız! Anasayfaya yönlendiriliyorsunuz...");
    }

    const handleShowAlert = (text, type = `success`) => {
        setAlertMessage(text)
        setAlertType(type);
        setIsShowAlert(true)
    }

    const value = {
        user, setUser,
        userLogin,

        isLoggedIn, setIsLoggedIn,
        isShowAlert,
        alertMessage,
        alertType,
        setIsShowAlert,
        handleShowAlert,
    }

    return (
        <context.Provider value={value}>
            <Toaster />
            {children}
        </context.Provider>
    )
}





