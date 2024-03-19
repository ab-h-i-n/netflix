import React, { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../SupaBase";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

const AddReview = ({ setReviewAdded, isReviewAdded }) => {
  const [dp, setDp] = useState();
  const { id } = useParams();
  const user = useContext(UserContext);
  const reviewInput = useRef();
  const [movieData, setMovieData] = useState([]);
  const [hasValue, setHasValue] = useState(false);

  const getProfileUrl = () => {
    const { data: url, error: urlError } = supabase.storage
      .from("photo")
      .getPublicUrl(`${user.id}/profile`);
    setDp(url?.publicUrl + "?" + Date.now());
  };

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

  const postReview = async (e) => {
    e.preventDefault();
    try {
      // Create a new review object
      const newReview = {
        user_id: user?.id,
        user_name: user?.user_metadata.full_name,
        user_profile: dp,
        timestamp: new Date(Date.now()).toLocaleString(),
        review: reviewInput.current.value,
      };

      // If there's no existing reviews array, create a new one
      const updatedData = {
        ...movieData[0],
        reviews: movieData[0]?.reviews
          ? [...movieData[0].reviews, newReview]
          : [newReview],
      };

      console.log("updated data : ", updatedData);
      console.log("Movie data", movieData);

      if (movieData.length === 0) {
        // Insert a new row with the new data
        const { error } = await supabase
          .from("reviews")
          .insert({ movie_id: id, reviews: [updatedData.reviews[0]] });

        if (error) {
          throw error;
        }
      } else {
        // Update the existing row with the new data
        const { error: updateError } = await supabase
          .from("reviews")
          .update(updatedData)
          .eq("movie_id", id);

        if (updateError) {
          throw updateError;
        }
      }

      console.log("Review posted successfully");
      fetchData(); // Fetch data again after posting the review
      reviewInput.current.value = ""; // Clear the input field
    } catch (error) {
      console.error("Error posting review:", error.message);
    } finally {
      setReviewAdded(!isReviewAdded);
    }
  };

  const handleInputChange = (e) => {
    e.target.value.length > 0 ? setHasValue(true) : setHasValue(false);
  };

  useEffect(() => {
    getProfileUrl();
    fetchData();
  }, []);
  return (
    <div className="grid place-items-center my-5 lg:my-10">
      <form onSubmit={postReview} className="min-w-[350px] lg:min-w-[800px]">
        {/* image and input  */}
        <div className="flex gap-x-5 items-center">
          <img src={dp} alt="user" className="w-14 rounded-full" />
          {/* input  */}
          <input
            ref={reviewInput}
            onChange={handleInputChange}
            type="text"
            placeholder="Add Review"
            className="w-full outline-none border-t-none border-b-[1px] focus:border-b-2 focus:font-medium border-white bg-transparent text-white placeholder-white"
          />
        </div>

        {/* buttons  */}
        <div className="flex gap-x-3 justify-end">
          <button
            type="reset"
            className="bg-zinc-900 font-medium text-white py-2 px-3 rounded-full hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            disabled={!hasValue}
            type="submit"
            className={`${
              !hasValue && "opacity-30"
            } bg-zinc-900 font-medium text-white py-2 px-3 rounded-full ${hasValue && "hover:bg-zinc-800"}`}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
