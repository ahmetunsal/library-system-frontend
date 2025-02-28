import React, { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../_context/GlobalContext";
import Tables from "../../components/tables/Tables";
import AddBookModal from "../../components/modal/AddBookModal";
import DeleteBookModal from "../../components/modal/delete/DeleteBookModal";
import EditBookModal from "../../components/modal/edit/EditBookModal";
import { Link, Outlet } from "react-router";
import NotFound from "../notFound/NotFound";
import { nav } from "../../utils/config";

const Admin = () => {

  const { user } = useContext(context);


  // if(user && roleConditions[user.role] !== "admin") return <NotFound />;
 
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-hidden flex">
      <div className="w-2/12 duration-150 flex flex-col py-5 bg-black text-white ">
        <span className="py-4 text-2xl text-center">KütüPNCR Admin</span>
        <div className="w-full flex">
          <ul className="w-full flex flex-col">
            {nav.map(n => {
              return (
                <li className="w-full flex px-2">
                  <Link to={n.url} className="w-full px-3 py-2 duration-100 rounded-md hover:bg-zinc-900">
                    {n.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="w-10/12 col-span-11 flex flex-col overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
