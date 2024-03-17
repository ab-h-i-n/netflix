import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import { UserContext } from "../UserContext";

const ReviewCard = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const reviewInput = useRef();
  const [reviewText, setReviewText] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .eq("movie_id", id);

      if (error) {
        throw error;
      }

      setReviewText(data);
      console.log("Fetched", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const postReview = async (e) => {
    e.preventDefault();

    try {
      const newReview = {
        user_id: user?.id,
        review: reviewInput.current.value,
      };

      const { data, error } = await supabase
        .from("reviews")
        .upsert({ movie_id: id, reviews: [newReview] })
        .select();

      if (error) {
        throw error;
      }

      console.log("Posted data : ", data);
      fetchData(); // Fetch data again after posting the review
    } catch (error) {
      console.error("Error posting review:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form
        action="#"
        method="post"
        className="p-10 bg-zinc-800 flex flex-col max-w-[400px] gap-y-3"
        onSubmit={postReview}
      >
        <input type="text" ref={reviewInput} />
        <button type="submit" className="bg-zinc-300 p-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewCard;
