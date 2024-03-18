import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../SupaBase";
import { UserContext } from "../UserContext";

const ReviewCard = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const reviewInput = useRef();
  const [movieData, setMovieData] = useState([]);

  const getProfileUrl = () => {
    const { data: url, error: urlError } = supabase.storage
      .from("photo")
      .getPublicUrl(`${user.id}/profile`);

    return url;
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
        user_profile: getProfileUrl()?.publicUrl,
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
