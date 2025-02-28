import axios from "axios"
import { userObj } from "../utils/config";
import { RiSafariFill } from "react-icons/ri";



const fetcher = async (url) => { return await axios.get(url).catch(err => console.error(err)); }
const poster = async (url, data) => { return await axios.post(url, data).catch(err => { console.error(err); return { status: err.status } });};
const putter = async (url, data) => { return await axios.put(url, data).catch(err => new Error("PNCR_API_PUTTER", err));};
const deleter = async (url, data) => { return await axios.delete(url, data).catch(err => new Error("PNCR_API_PUTTER", err));};
const authFetcher = async (url, token) => { return await axios.get(url, { headers: { Authorization: `PNCRYazilim ${token}` } }).catch(err => new Error("PNCR_API_AUTH_FETCHER", err));}
const authPoster = async (url, token, { data }) => { return await axios.post(url, data, { headers: { Authorization: `PNCRYazilim ${token}` } }).catch(err => new Error("PNCR_API_AUTH_POSTER", err));}
const formDataPoster = async (url, data) => { return await axios.post(url, data, { headers: { 'Content-Type':'multipart/form-data' } }).catch(err => console.error(err));}
const formDataPutter = async (url, data) => { return await axios.put(url, data, { headers: { 'Content-Type':'multipart/form-data' } }).catch(err => console.error(err));}

const BASE_URL = `http://localhost:8000/`
const API_URL = BASE_URL + `api/`

const TOKEN_URL = API_URL + `token/`
const TOKEN_VERIFY_URL = TOKEN_URL +  `verify/`;
const TOKEN_REFRESH_URL = TOKEN_URL +  `refresh/`;

const USER_URL = API_URL + `user/`

const BOOKS_URL = API_URL + `books/`
const CATEGORIES_URL = API_URL + `categories/`
const AUTHORS_URL = API_URL + `authors/`
const PUBLISHERS_URL = API_URL + `publishers/`
const COMMENTS_URL = API_URL + `comments/`
const LOAN_URL = API_URL + `loans/`
const FAVORITES_URL = API_URL + `favorites/`
const BOOK_TRACKINGS_URL = API_URL + `booktrackings/`
const RESERVATIONS_URL = API_URL + `reservations/`
const PENALTIES_URL = API_URL + `penalties/`


/**
 * 
 * @returns {string}
 */
const getToken = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token) return null;

    return token;
}


export const postTokenVerify = async () => {
    const token = getToken();
    if (!token) return false;

    const res = await poster(TOKEN_VERIFY_URL, { token })
    // console.log(res);
    return res.status == 200 ?? true;
}

export const postTokenRefresh = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("refresh")) || false;
    if (!refreshToken) return false;

    const res = await axios.post(TOKEN_REFRESH_URL, {
        refresh: refreshToken
    }).catch(err => {
        // alert(`Beklenmedik hata: ${err.message}`);
        console.log("Beklenmedik hata:", err);
        return false;
    })

    localStorage.setItem("token", JSON.stringify(res.data.access));
    return res.status == 200;
}


export const postUserLogin = async (username, password) => {
    try {
        const res = await poster(TOKEN_URL, { username, password });
        console.log("POST_USER_LOGIN", res.status);

        if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.access));
            localStorage.setItem("refresh", JSON.stringify(res.data.refresh));
            return { success: true };
        }
        return { success: false, error: "Giriş başarısız" };
    } catch (error) {
        console.error("Login error:", error);
        return { 
            success: false, 
            error: "Kullanıcı adı veya şifre hatalı" 
        };
    }
}


// export const postUserLogin = async (username, password) => {
//     const res = await poster(TOKEN_URL, { username, password })
//     console.log("POST_USER_LOGIN", res.status);

//     localStorage.setItem("token", JSON.stringify(res.data.access));
//     localStorage.setItem("refresh", JSON.stringify(res.data.refresh));
//     return res.status == 200 ? true : false;
// }

/**
 * 
 * @returns {userObj}
 */
export const getUserInfo = async () => {
    const token = getToken();
    if (!token) return false;

    const res = await authFetcher(USER_URL, token);
    const { password, ...data } = res.data[0];
    return data;
};

export const getSingleUser = async (id) => {
    const res = fetcher(`${USER_URL}${id}/`);
    console.log("SINGLE_USER", res);

    return res;
}

export const getAllUsers = async () => {
    const res = fetcher(USER_URL);
    console.log("ALL_USER", res);

    return res;
}

export const postRegisterUser = async (data) => {
    const res = await formDataPoster(USER_URL, data)
    console.log("ADD_USER", res);
    
    return res;
}

export const putEditUser = async (data, id) => {
    const res = await formDataPutter(`${USER_URL}${id}/`, { ...data, id });
    console.log("EDIT_USER",res)

    return res;
}

export const deleteDestroyUser = async (id) => {
    const res = await deleter(`${USER_URL}${id}`)
    console.log("DELETE_USER", res);

    return res;
}


export const getOneBook = async (id) => {
    const res = await fetcher(`${BOOKS_URL}${id}/`);
    console.log('GET_ONE_BOOK', res);

    return res
}

export const getAllBooks = async () => {
    const res = await fetcher(BOOKS_URL)
    // console.log(res);

    return res
}

export const getAllLoans = async () => {
    const res = await fetcher(LOAN_URL);
    console.log("ALL_LOANS", res);

    return res
}

export const postAddBook = async (data) => {
    console.log("POSTADDDATA", data);
    const res = await formDataPoster(`${BOOKS_URL}add_kitap/`, data);
    console.log("ADD_BOOK",res)

    return res;
}


export const putEditBook = async (data, id) => {
    console.log("EDIT_BOOK_ALOOOO", { ...data, id });
    const res = await putter(`${BOOKS_URL}guncelle_kitap/`, { ...data, id });
    console.log("EDIT_BOOK",res)

    return res;
}

export const deleteDestroyBook = async (bookId) => {
    const res = await deleter(`${BOOKS_URL}${bookId}/`);
    console.log("DELETE_BOOK",res)

    return res;
}


export const getAllCategories = async () => {
    const res = await fetcher(CATEGORIES_URL)
    // console.log(res);

    return res
}

export const postAddCategory = async (categoryName) => {
    const res = await poster(CATEGORIES_URL, { name: categoryName });
    console.log("ADD_CATEGORY",res)

    return res;
}

export const postEditCategory = async (categoryName, id) => {
    const res = await putter(`${CATEGORIES_URL}${id}/`, { name: categoryName });
    console.log("EDIT_CATEGORY",res)

    return res;
}

export const deleteDestroyCategory = async (id) => {
    const res = await deleter(`${CATEGORIES_URL}${id}/`);
    console.log("DELETE_CATEGORY",res)

    return res;
}


export const getAllAuthors = async () => {
    const res = await fetcher(AUTHORS_URL)
    // console.log("AUTHORS", res);

    return res
}



export const postAddAuthor = async (authorName, authorSurname, authorBirthday) => {
    const res = await poster(AUTHORS_URL, { first_name: authorName, last_name: authorSurname, birth_date: authorBirthday });
    console.log("ADD_Author",res)

    return res;
}



export const putEditAuthor = async (authorName, authorSurname, authorBirthday, id) => {
    const res = await putter(`${AUTHORS_URL}${id}/`, 
        { 
            first_name: authorName, 
            last_name: authorSurname,
            birth_date: authorBirthday 
        }
    );
    console.log("EDIT_AUTHOR",res)

    return res;
}

export const deleteDestroyAuthor = async (id) => {
    const res = await deleter(`${AUTHORS_URL}${id}/`);
    console.log("DELETE_AUTHOR",res)

    return res;
}




export const getAllPublishers = async () => {
    const res = await fetcher(PUBLISHERS_URL)
    // console.log("PUBLISHERS", res);

    return res
}


export const postAddPublisher = async (publisherName, publisherAddress, publisherWebsite) => {
    const res = await poster(PUBLISHERS_URL, { name: publisherName, address: publisherAddress, website: publisherWebsite });
    console.log("ADD_PUBLISHER",res)

    return res;
}


export const putEditPublisher = async (publiserName, publisherAddress, publisherWebsite, id) => {
    const res = await putter(`${PUBLISHERS_URL}${id}/`, 
        { 
            name: publiserName, 
            address: publisherAddress,
            website: publisherWebsite 
        }
    );
    console.log("EDIT_PUBLISHER",res)

    return res;
}


export const deleteDestroyPublisher = async (id) => {
    const res = await deleter(`${PUBLISHERS_URL}${id}/`);
    console.log("DELETE_PUBLISHER",res)

    return res;
}



export const getBookComments = async (id) => {
    const res = await fetcher(`${BOOKS_URL}${id}/get_comments/`);
    console.log("ALL_COMMENTS", res);
    
    return res;
}

export const postBookComment = async (userId, bookId, text, rating) => {
    const res = await poster(`${COMMENTS_URL}`, { user: userId, book: bookId, text, rating });
    console.log("POST_COMMENTS", res);

    return res;
}



export const postLoanBook = async (userId, bookId) => {
    const res = await poster(LOAN_URL, { user: userId, book: bookId, is_returned: false });
    console.log("LOAN_BOOK", res);

    return res;
}


export const putLoanBookReturned = async (loanId, userId, bookId) => {
    const res = await putter(`${LOAN_URL}${loanId}/`, { user: userId, book: bookId, is_returned: true });
    console.log("LOAN_BOOK_RETURNED", res);

    return res;
}

export const postAddToFavorites = async (userId, bookId) => {
    const res = await poster(FAVORITES_URL, { user: userId, book: bookId });
    console.log("FAVORITE_BOOK", res);

    return res;
}


export const postBookTrack = async (userId, bookId) => {
    const res = await poster(BOOK_TRACKINGS_URL, { user: userId, book: bookId,  notification_status: true });
    console.log("BOOK_TRACKINGS", res);

    return res;
}

export const postBookRevervation = async (userId, bookId) => {
    const res = await poster(RESERVATIONS_URL, { user: userId, book: bookId,  is_active: true });
    console.log("BOOK_RESERVATIONS", res);

    return res;
}


export const postAddPenalty = async (userId, amount, reason, isPaid) => {
    const res = await poster(PENALTIES_URL, { user: userId, amount, reason, is_paid: isPaid });
    console.log("PENALTY", res);

    return res;
}

