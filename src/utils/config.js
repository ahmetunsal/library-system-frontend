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


export const bookObj = {
    "title": "",
    "isbn": "",
    "publication_date": null,
    "pages": null,
    "language": "",
    "description": "",
    "cover_image": null,
    "stock": null,
    "status": null
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
        url: "/about-us",
    },
    {
        title: "İletişim",
        url: "/contact",
    },
    {
        title: "Kitaplar",
        url: "/admin",
    },
    {
        title: "Kategoriler",
        url: "/categories",
    },
    {
        title: "Yazarlar",
        url: "/authors",
    },
]



