import React, { useContext } from "react";
import { postUserLogin } from "../../_api/api";
import { context } from "../../_context/GlobalContext";
import { isEmpty } from "../../utils/config";
import { Navigate } from "react-router";

const Login = () => {

  const { user, setUser, userLogin, isLoggedIn, handleShowAlert } = useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isEmpty(user.username) || isEmpty(user.password)) return handleShowAlert("Kullanıcı adı ve şifre gereklidir.", "danger")
    userLogin()
  };

  if(isLoggedIn) return <Navigate to={"/"} />

  return (
    <div className="w-full h-[90vh] flex items-center justify-center text-center px-2">
      <div className="w-full md:w-2/5 flex flex-col gap-5 text-white bg-black rounded-md py-7 px-5">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-4xl ">Giriş Yap</h1>
          <p className="w-11/12 text-start">Yeni kitaplar, yeni keşifler için hemen giriş yap!</p>
        </div>
        <div className="flex flex-col gap-7 text-white">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="username">Kullanıcı adı</label>
              <input
                id="username"
                type="username"
                onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="Kullanıcı adınız"
                className="w-full rounded-md py-2 px-3 outline-none border border-white"
              />
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <label htmlFor="password">Şifre</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Şifreniz"
                className="w-full rounded-md py-2 px-3 outline-none border border-white"
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <button
                type="submit"
                className="border border-white hover:bg-white hover:cursor-pointer duration-100 hover:text-black py-2 px-3 rounded-md"
              >
                Giriş Yap
              </button>
            </div>
          </form>
          <hr />
          <div className="flex flex-col">
            <span>
              Henüz kayıt olmadınız mı?{" "}
              <a href="/register" className="text-blue-500">
                Hemen kayıt olun!
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
