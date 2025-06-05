import React from "react";
import { useGlobalContext } from "../../Layout";

function extractYouTubeVideoId(url) {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

export default function Trailer({ trailer }) {
  const videoId = extractYouTubeVideoId(trailer);
  const context = useGlobalContext();

  const { handleClose } = context;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <iframe
        width="100%"
        height="600px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Trình phát video YouTube"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}
