import { createContext, useEffect, useState } from "react";
import { bookObj, newUserObj, outOfArray, USER_ROLES, userObj } from "../utils/config";
import { deleteDestroyAuthor, deleteDestroyBook, deleteDestroyCategory, deleteDestroyPublisher, deleteDestroyUser, getAllAuthors, getAllBooks, getAllCategories, getAllPublishers, getAllUsers, getBookComments, getOneBook, getUserInfo, postAddAuthor, postAddBook, postAddPublisher, postBookComment, postEditCategory, postRegisterUser, postTokenVerify, postUserLogin, putEditAuthor, putEditBook, putEditPublisher  } from "../_api/api";
import Toaster from "../components/Toaster";


export const context = createContext();


export const GlobalProvider = ({ children }) => {
    // User information
    const [user, setUser] = useState(userObj);
    const [newUser, setNewUser] = useState(newUserObj);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // All category list ekle state! 
    const [allCategories, setAllCategories] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);
    const [allPublishers, setAllPublishers] = useState([]);

    const [book, setBook] = useState(bookObj);

    // Alerts
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertType, setAlertType] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    

    useEffect(() => {
        const getAll = async () => {
            const categories = await getAllCategories();
            const authors = await getAllAuthors();
            const publishers = await getAllPublishers();

            setAllCategories(categories.data)
            setAllAuthors(authors.data)
            setAllPublishers(publishers.data)
        }


        verifyToken();
        getAll();
    }, []);

    useEffect(() => {
        // console.log("BOOK_GUNCELLENDİ", book);
        console.log("USER_GUNCELLENDİ", user);
    }, [user])
    
    const handleShowAlert = (text, type = `success`) => {
        setAlertMessage(text)
        setAlertType(type);
        setIsShowAlert(true)
    }

    const verifyToken = async () => {
        const isAuthenticated = await postTokenVerify();
        setIsLoggedIn(isAuthenticated)
        if (!isAuthenticated) return;

        const user = await getUserInfo();
        setUser(user);
    }

    const userLogin = async () => {
        const isLoginSuccess = await postUserLogin(user.username, user.password);
        // console.log('USER_LOGIN', isLoginSuccess);
        if(!isLoginSuccess) return handleShowAlert("Başarısız giriş. Lütfen bilgilerinizi doğru girdiğinizden emin olunuz.");
        handleShowAlert("Başarıyla giriş yaptınız! Anasayfaya yönlendiriliyorsunuz...");
        setTimeout(() => {
            window.location = "/";
        }, 3000);
    }

    

    const value = {
        user, setUser,
        userLogin,


        book,
        setBook,

        allCategories,
        allAuthors,
        allPublishers,

        isLoggedIn, setIsLoggedIn,
        isShowAlert,
        alertMessage,
        alertType,
        setIsShowAlert,
        handleShowAlert,

        bookObj,
        getOneBook,
        getAllBooks,
        postAddBook,
        putEditBook,
        deleteDestroyBook,

        getAllCategories,
        postEditCategory,
        deleteDestroyCategory,

        getAllAuthors,
        postAddAuthor,
        putEditAuthor,
        deleteDestroyAuthor,

        getAllPublishers,
        postAddPublisher,
        putEditPublisher,
        deleteDestroyPublisher,

        getBookComments,
        postBookComment,

        newUserObj,
        getAllUsers,
        postRegisterUser,
        deleteDestroyUser,

        USER_ROLES,
        outOfArray
    }

    return (
        <context.Provider value={value}>
            <Toaster />
            {children}
        </context.Provider>
    )
}





