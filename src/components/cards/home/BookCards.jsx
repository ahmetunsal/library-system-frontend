import React from "react";
import { Link } from "react-router";

const BookCards = () => {
  return (
    <div className="w-full h-[93.7vh] flex bg-center justify-center relative ">
      <img
        src="/1984.png"
        alt="1984"
        className="w-full bg-center bg-no-repeat bg-auto"
      />
      <div className="w-full h-full absolute top-0 left-0 flex items-end bg-gradient-to-t from-black via-50% via-[#00000041] to-[#000000] z-10">
        <div className="w-full flex flex-col md:flex-row gap-5 items-start justify-between text-white px-5 md:px-10 pb-10">
          <div className="flex flex-col px-2">
            <h2 className=" text-5xl md:text-9xl">1984</h2>
            <h4 className=" text-2xl md:text-4xl">George Orwell</h4>
          </div>
          <div className="flex">
            <Link
              to={"/"}
              className="bg-red-700 hover:bg-red-800 duration-100 py-4 px-5 rounded-full"
            >
              Kitap Detayları
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCards;
