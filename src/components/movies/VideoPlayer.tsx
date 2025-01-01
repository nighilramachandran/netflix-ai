import React from "react";

interface VideoPlayerProps {
  id: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}?&autoplay=1&loop=1&mute=1&controls=0`}
      title="YouTube video player"
      allow="accelerometer; &autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>
  );
};

export default VideoPlayer;
