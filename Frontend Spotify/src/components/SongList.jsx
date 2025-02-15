import React, { useState } from "react";
import SongItem from "./SongItem";

const SongList = ({ songsArray }) => {
  const [items, setItems] = useState(5);

  return (
    <div className="song-list">
      {songsArray
        .filter((currentValue, index) => index < items)
        .map((currentSongObj, index) => (
          <SongItem {...currentSongObj} index={index} key={index} />
        ))}
      {/* quero fazer o botão desaparecer qnd n tiver mais o que mostrar */}
      <p className="song-list__see-more" onClick={() => setItems(items + 5)}>
        Ver mais
      </p>
    </div>
  );
};

export default SongList;
