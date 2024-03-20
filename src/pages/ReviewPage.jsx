import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import { UserContext } from "../UserContext";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";

const ReviewPage = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
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
    window.scrollTo(0, 0);
    fetchData();
  }, [isReviewadded]);

  return (
    <div className="min-h-screen">
      <nav className="p-5 flex justify-between">
        {/* backbutton  */}

        <button onClick={() => navigate(-1)}>
          <img src="/assets/chevron_left.svg" alt="back" className="w-7" />
        </button>

        <h1 className="text-white font-black text-xl w-full text-center">
          All Reviews
        </h1>

        <button></button>
      </nav>
      {/* add review  */}

      <AddReview
        animate={animate}
        setAnimate={setAnimate}
        setReviewAdded={setReviewAdded}
        isReviewAdded={isReviewadded}
      />

      {/* reviews  */}
      <div
        className={`transition-all grid gap-y-5 px-5 py-5 place-items-center ${
          animate && "review-add"
        }`}
      >
        {movieData[0]?.reviews
          ?.slice()
          .reverse()
          .map((review) => (
            <ReviewCard review={review} />
          ))}
        {movieData?.length === 0 && (
          <h1 className="text-white text-center font-semibold">
            No reviews yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
