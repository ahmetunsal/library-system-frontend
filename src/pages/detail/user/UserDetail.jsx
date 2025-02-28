import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { context } from "../../_context/GlobalContext";
import { LiaCloudMoonSolid } from "react-icons/lia";
import { GrFavorite } from "react-icons/gr";
import { GiRingingBell } from "react-icons/gi";
import { BiHeart } from "react-icons/bi";
import { FaBell, FaHeart } from "react-icons/fa";
import Star from "../../components/star/Star";
import CommentCard from "../../components/comment/CommentCard";
import { STATUS } from "../../utils/config";

const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const { user, getSingleUser, outOfArray } = useContext(context);

  useEffect(() => {
    const getBookAndComments = async () => {
        const res = await getSingleUser(id);
        setUserDetail(res.data);
    }

    getBookAndComments();
  }, []);

  if(bookComments.length == 0) return <>Yükleniyor..</>

  return (
    <div className="w-full min-h-screen relative flex flex-col gap-6 md:gap-10 p-5 md:p-10 bg-gradient-to-b from-black to-[#0000009f]">
      <div className="w-full flex flex-col md:flex-row justify-between md:gap-5">
        <div className="flex flex-col md:flex-row md:gap-5">
          <img src={userDetail.profile_image} alt={userDetail.username} className="w-sm rounded-md" />
          <div className="flex flex-col gap-3 md:gap-5 py-10 text-white">
            <div className="flex md:flex-col md:gap-3 justify-between md:justify-normal">
              <h1 className="text-4xl">{userDetail.title}</h1>
              <h4 className="hidden md:flex text-xl">{userDetail.author_name && userDetail.author_name.map(a => a).join(",")}</h4>
              <h4 className={`hidden w-fit md:flex items-center px-3 py-1 rounded-full text-md`} style={{ backgroundColor: `${STATUS[userDetail.status] ? STATUS[userDetail.status].color : ""}` }}>{STATUS[userDetail.status] ? STATUS[userDetail.status].text : ""}</h4>
            </div>
            <h4 className="md:hidden text-xl">{userDetail.author_name && userDetail.author_name.map(a => a).join(",")}</h4>
            <h4 className={`md:hidden w-fit flex items-center px-3 py-1 rounded-full text-md`} style={{ backgroundColor: `${STATUS[userDetail.status] ? STATUS[userDetail.status].color : ""}` }}>{STATUS[userDetail.status] ? STATUS[userDetail.status].text : ""}</h4>
            <div className="flex flex-row gap-3 text-black">
              <button className="w-10 h-auto group/btn hover:cursor-pointer flex items-center justify-center bg-white rounded-full">
                <FaHeart className="w-5 h-auto group-hover/btn:text-red-500 duration-150" />
              </button>
              <button className="w-10 h-auto group/btn hover:cursor-pointer flex items-center justify-center bg-white rounded-full">
                <FaBell className="w-5 h-auto group-hover/btn:text-amber-600 duration-150" />
              </button>
              <button className="p-2 bg-white hover:bg-black hover:shadow-[0_0_10px] hover:shadow-amber-50 hover:text-white duration-150 hover:cursor-pointer rounded-2xl">
                Rezerve et
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white">
          <label htmlFor="">Yorum ekle</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="border" />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={null} disabled selected>Bir Puan Verin..</option>
            {
              outOfArray.map((i) => {
                return (
                  <option value={i}>{i}</option>
                )
              })
            }
          </select>
          <button onClick={handleSendComment} className="border px-2 py-1">
            Gönder
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-white">
        <h2 className="text-4xl">Kitap Hakkında</h2>
        <div className="flex px-3">
          <p className="text-justify"> 
            {userDetail.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-white">
        <h2 className="text-4xl">Kitap Yorumları</h2>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          {/* {!bookComments && <>Yükleniyor..</>} */}
          {bookComments.map(c => {
            return (
              <CommentCard comment={c.text} starCount={c.rating} username={c.user_info.username}  />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
