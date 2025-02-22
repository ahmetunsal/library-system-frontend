import React, { useContext } from "react";
import { context } from "../../_context/GlobalContext";
import { roleConditions } from "../../utils/config";
import { Link } from "react-router";

const Profile = () => {

  const { user } = useContext(context);


  return (
    <div className="text-black">
      <h1>Hello, {user.username}</h1>
      {roleConditions[user.role] ? (
        <>
          <Link to={roleConditions[user.role].url}>{roleConditions[user.role].title}</Link>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
