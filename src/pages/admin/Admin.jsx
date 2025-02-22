import React, { useContext } from "react";
import { roleConditions } from "../../utils/config";
import { context } from "../../_context/GlobalContext";

const Admin = () => {


  const { user } = useContext(context);

  if(!roleConditions[user.role]) return <>Not found.</>;

  return <div>Admin</div>;
};

export default Admin;
