import React from "react";
import Star from "../star/Star";

const CommentCard = ({ username, comment, starCount }) => {
  return (
    <div className="flex flex-col bg-[#ffffffbd] gap-3 text-black rounded-md py-2 px-3">
      <div className="flex justify-between">
        <h6 className="text-2xl">{username}</h6>
        <div className="flex">
          <Star starCount={starCount} />
        </div>
      </div>
      <div className="flex pb-3">
        {comment}
      </div>
    </div>
  );
};

export default CommentCard;
