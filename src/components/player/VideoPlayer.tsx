import React from "react";

interface VideoPlayerProps {
  param: string | number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ param }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${param}?&autoplay=1&loop=1&mute=1&controls=0`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ scale: 1.5 }}
    ></iframe>
  );
};

export default VideoPlayer;
