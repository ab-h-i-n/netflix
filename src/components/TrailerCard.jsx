import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiToken } from "../env";

const TrailerCard = ({ playState, type }) => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const TrailerUrl = `https://www.youtube.com/embed/${trailer}`;

  const fetchVideo = async () => {
    try {
      const apiFetchUrl = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;

      const response = await fetch(apiFetchUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      });

      const json = await response.json();
      setVideos(json.results);

      const foundTrailer = json.results.find(
        (video) => video.type == "Trailer"
      );

      if (!foundTrailer) {
        setTrailer(json.results[json.results.length - 1].key);
      } else {
        setTrailer(foundTrailer.key);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id, type]);

  return (
    <iframe
      className={`w-screen aspect-video ${
        playState ? "" : "hidden"
      } lg:w-[50vw] `}
      src={TrailerUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen=""
    ></iframe>
  );
};

export default TrailerCard;
