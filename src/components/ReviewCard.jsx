import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="transition-all bg-zinc-900 px-3 py-2 grid divide-y-[1px] divide-zinc-700 rounded-xl min-w-[350px] lg:min-w-[800px]">
      {/* header  */}
      <header className="flex justify-between items-center py-3">
        {/* user  */}
        <div className="flex gap-x-3 items-center">
          {/* profile photo  */}
          <div className="rounded-full w-10 h-10 lg:w-12 lg:h-12 overflow-hidden">
            <img
              src={review?.user_profile + "?" + Date().now}
              alt={review?.user_name}
              className="object-cover w-full h-full"
            />
          </div>
          {/* user name  */}
          <p className="text-white text-lg font-semibold">
            {review?.user_name}
          </p>
        </div>

        {/* time  */}
        <div className="text-zinc-700 text-xs font-medium ">
          <p>{review?.timestamp.split(",")[0]}</p>
          <p>{review?.timestamp.split(",")[1]}</p>
        </div>
      </header>
      <main className="text-white py-2 lg:py-5">{review?.review}</main>
    </div>
  );
};

export default ReviewCard;
