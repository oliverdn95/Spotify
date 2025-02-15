import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Song = () => {
  const { id } = useParams();

  const { image, name, duration, artist, audio } = songsArray.filter(
    (currentSongObj) => currentSongObj._id === id
  )[0];
  const artistObj = artistArray.filter(
    (currentartistObj) => currentartistObj.name === artist
  )[0];
  const songObj = { image, name, duration, artist, audio };
  songObj._id = id;

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da Música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        <div className="song__artist-imag">
          <Link to={`/artist/${artistObj._id}`}>
            <img
              width={75}
              height={75}
              src={artistObj.image}
              alt={`Imagem do Artista ${artist}`}
            />
          </Link>
        </div>

        <Player {...songObj} />
        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
