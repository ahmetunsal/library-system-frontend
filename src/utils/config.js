import { FaUser } from "react-icons/fa"

export const userObj = {
    username: "",
    password: "",
    email: "",
    profilePicture: "",
    firstName: "",
    lastName: "",
    role: "",
    isSuperUser: false,
    isActive: false
}


export const isEmpty = (str) => !str.trim().length;

export const roleConditions = {
    admin: {
        title: "Admin Panel",
        url: "/admin",
    },

    staff: {
        title: "Personel Panel",
        url: "/staff",
    },
}


export const loginBtn = {
    title: "Giriş Yap",
    url: "/login"
}

export const navList = [
    {
        title: "Kütüphane",
        url: "/books"
    },
    {
        title: "Hakkımızda",
        url: "/about-us"
    },
    {
        title: "İletişim",
        url: "/contact"
    },
]



