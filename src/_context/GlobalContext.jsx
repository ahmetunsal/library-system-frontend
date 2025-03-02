import { createContext, useEffect, useState } from "react";
import { bookObj, newUserObj, outOfArray, REASON_CHOICES, REASON_CHOICES_OBJ, USER_ROLES, USER_ROLES_OBJ, userObj } from "../utils/config";
import { deleteDestroyAuthor, deleteDestroyBook, deleteDestroyCategory, deleteDestroyPublisher, deleteDestroyUser, getAllAuthors, getAllBooks, getAllCategories, getAllLoans, getAllPublishers, getAllUsers, getBookComments, getOneBook, getSingleUser, getUserInfo, postAddAuthor, postAddBook, postAddPenalty, postAddPublisher, postAddToFavorites, postBookComment, postBookRevervation, postBookTrack, postEditCategory, postLoanBook, postRegisterUser, postSendMail, postTokenVerify, postUserLogin, putEditAuthor, putEditBook, putEditPublisher, putEditUser, putLoanBookReturned  } from "../_api/api";
import Toaster from "../components/Toaster";
import { generatePassword } from "../utils/functions";
import '../assets/css/UserDetail.css'


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
    const [allUsers, setAllUsers] = useState([]);

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
            const users = await getAllUsers();

            setAllCategories(categories.data)
            setAllAuthors(authors.data)
            setAllPublishers(publishers.data)
            setAllUsers(users.data)
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
        const loginResult = await postUserLogin(user.username, user.password);
        if(!loginResult.success) {
            handleShowAlert(loginResult.error, "danger");
            return;
        }
        handleShowAlert("Başarıyla giriş yaptınız! Anasayfaya yönlendiriliyorsunuz...");
        setTimeout(() => {
            window.location = "/";
        }, 3000);
    }

    

    const value = {
        userObj,
        user, setUser,
        userLogin,

        book,
        setBook,

        allUsers, setAllUsers,
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
        getSingleUser,
        postRegisterUser,
        putEditUser,
        deleteDestroyUser,

        postLoanBook,
        putLoanBookReturned,
        postAddToFavorites,
        postBookTrack,
        postBookRevervation,
        getAllLoans,

        postAddPenalty,

        USER_ROLES,
        REASON_CHOICES,
        USER_ROLES_OBJ,
        REASON_CHOICES_OBJ,
        outOfArray,

        generatePassword,

        postSendMail,
    }

    return (
        <context.Provider value={value}>
            <Toaster />
            {children}
        </context.Provider>
    )
}





