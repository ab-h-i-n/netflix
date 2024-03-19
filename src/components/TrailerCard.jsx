import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, apiToken } from "../env";
import YouTube from "react-youtube";

const TrailerCard = ({ playState, type }) => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const TrailerUrl = `https://www.youtube.com/watch?v=${trailer}`;

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

  const opts = {
    height: "428",
    width: "435",
    playerVars: {
      autoplay: 0,
    },
  };

  const optsDesktop = {
    height: "640",
    width: "1830",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <YouTube
        videoId={trailer}
        opts={opts}
        className={`${playState ? "block" : "hidden"} `}
      />
    </>
  );
};

export default TrailerCard;
