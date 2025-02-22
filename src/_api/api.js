import axios from "axios"
import { userObj } from "../utils/config";
import { RiSafariFill } from "react-icons/ri";



const fetcher = async (url) => { return await axios.get(url).catch(err => new Error("PNCR_API_FETCHER", err)); }
const poster = async (url, data) => { return await axios.post(url, data).catch(err => new Error("PNCR_API_POSTER", err));};
const putter = async (url, data) => { return await axios.put(url, data).catch(err => new Error("PNCR_API_PUTTER", err));};
const deleter = async (url, data) => { return await axios.delete(url, data).catch(err => new Error("PNCR_API_PUTTER", err));};
const authFetcher = async (url, token) => { return await axios.get(url, { headers: { Authorization: `PNCRYazilim ${token}` } }).catch(err => new Error("PNCR_API_AUTH_FETCHER", err));}
const authPoster = async (url, token, { data }) => { return await axios.post(url, data, { headers: { Authorization: `PNCRYazilim ${token}` } }).catch(err => new Error("PNCR_API_AUTH_POSTER", err));}

const BASE_URL = `http://localhost:8000/`
const API_URL = BASE_URL + `api/`

const TOKEN_URL = API_URL + `token/`
const TOKEN_VERIFY_URL = TOKEN_URL +  `verify/`;
const TOKEN_REFRESH_URL = TOKEN_URL +  `refresh/`;

const USER_URL = API_URL + `user/`

const BOOKS_URL = API_URL + `books/`
const CATEGORIES_URL = API_URL + `categories/`
const AUTHORS_URL = API_URL + `authors/`


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
    const res = await poster(TOKEN_URL, { username, password });
    
    localStorage.setItem("token", JSON.stringify(res.data.access));
    localStorage.setItem("refresh", JSON.stringify(res.data.refresh));
    return res.status == 200 ?? true;
}

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



export const getAllBooks = async () => {
    const res = await fetcher(BOOKS_URL)
    // console.log(res);

    return res
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
    console.log("AUTHORS", res);

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


