import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiKey, apiToken } from '../env';
import YouTube from 'react-youtube';

const TrailerCard = () => {

  const { id } = useParams();

  const apiFetchUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const TrailerUrl = `https://www.youtube.com/watch?v=${trailer}`

  const fetchVideo = async () => {
    try {
      const response = await fetch(apiFetchUrl, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Accept': 'application/json',
        }
      });

      const json = await response.json();
      setVideos(json.results);

      const foundTrailer = json.results.find(video => video.type == "Trailer");
      setTrailer(foundTrailer.key);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVideo();
  }, [id]);

  useEffect(() => {
    console.log(trailer);
  }, [trailer]);



  const opts = {
    height: '425',
    width: '425',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className='max-w-screen overflow-hidden'>
      <YouTube videoId={trailer} opts={opts} />
    </div>
  )
}

export default TrailerCard;
