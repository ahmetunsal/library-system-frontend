import { createContext, useEffect, useState } from "react";
import { userObj } from "../utils/config";
import { deleteDestroyAuthor, deleteDestroyCategory, getAllAuthors, getAllBooks, getAllCategories, getUserInfo, postAddAuthor, postEditCategory, postTokenVerify, postUserLogin, putEditAuthor  } from "../_api/api";
import Toaster from "../components/Toaster";


export const context = createContext();


export const GlobalProvider = ({ children }) => {
    // User information
    const [user, setUser] = useState(userObj);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // All category list ekle state! 

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
        setTimeout(() => {
            window.location = "/";
        }, 3000);
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

        getAllBooks,
        getAllCategories,

        postEditCategory,
        deleteDestroyCategory,

        getAllAuthors,
        postAddAuthor,
        putEditAuthor,
        deleteDestroyAuthor
    }

    return (
        <context.Provider value={value}>
            <Toaster />
            {children}
        </context.Provider>
    )
}





