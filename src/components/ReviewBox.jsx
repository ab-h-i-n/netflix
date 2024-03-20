import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";

const ReviewBox = () => {
  const { id, title } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isReviewadded, setReviewAdded] = useState(false);
  const [animate, setAnimate] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select()
        .eq("movie_id", id);

      if (error) {
        throw error;
      }
      console.log("Fetched", data);
      setMovieData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isReviewadded]);
  return (
    <div className="transition-all mx-10 lg:mx-24 my-10">
      <h1 className="text-xl lg:text-3xl font-semibold text-white py-5 ">
        Reviews
      </h1>

      {/* add review  */}
      <AddReview
        animate={animate}
        setAnimate={setAnimate}
        setReviewAdded={setReviewAdded}
        isReviewAdded={isReviewadded}
      />

      <div
        className={`transition-all grid gap-y-5 mt-5 place-content-center ${
          animate ? "review-add" : ""
        }`}
      >
        {movieData[0]?.reviews
          ?.slice(-2)
          .reverse()
          .map((review, index) => (
            <ReviewCard key={`reviews_review_box_${index}`} review={review} />
          ))}
      </div>
      {movieData?.length === 0 ? (
        <h1 className="text-white text-center font-semibold">No reviews yet</h1>
      ) : (
        <div className="flex justify-center py-5">
          <Link
            to={`/movies/${title}/${id}/reviews`}
            className="py-2 px-3 bg-red-600 text-white font-medium rounded"
          >
            Show all reviews
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
