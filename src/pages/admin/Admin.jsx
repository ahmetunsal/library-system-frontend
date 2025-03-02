import React, { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../_context/GlobalContext";
import Tables from "../../components/tables/Tables";
import AddBookModal from "../../components/modal/AddBookModal";
import DeleteBookModal from "../../components/modal/delete/DeleteBookModal";
import EditBookModal from "../../components/modal/edit/EditBookModal";
import { Link, Outlet, useLocation, useParams } from "react-router";
import NotFound from "../notFound/NotFound";
import { nav } from "../../utils/config";
import Navigation from "../../components/navigation/Navigation";

const Admin = () => {
  const { user } = useContext(context);
  const { pathname } = useLocation();

  if(nav.filter(n => n.isForAdmin).find(x => x.url == pathname) && user.role != "admin") return <NotFound />;
 
  return (
    <div className="flex flex-col">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Admin;
