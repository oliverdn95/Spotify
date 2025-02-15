import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCirclePause,
  faCirclePlay,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { songsArray } from "../assets/database/songs";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);

  return seconds + minutes * 60;
};

const Player = ({ image, name, duration, artist, audio, _id }) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSeconds = timeInSeconds(duration);

  const songArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === artist
  );
  const thisSongObj = songsArray.filter(
    (currentSongObj) => currentSongObj._id === _id
  )[0];
  const [index, setIndex] = useState(songArrayFromArtist.indexOf(thisSongObj));

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));
      progressBar.current.style.setProperty(
        "--_progress",
        (audioPlayer.current.currentTime / durationInSeconds) * 100 + "%"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="player__controllers">
        {index === 0 ? (
          <FontAwesomeIcon
            className="player__icon--disabled"
            icon={faBackwardStep}
          />
        ) : (
          <Link
            onClick={() => setIndex(index - 1)}
            to={`/song/${songArrayFromArtist[index - 1]?._id}`}
          >
            <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
          </Link>
        )}

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={() => playPause()}
        />
        {index === songArrayFromArtist.length - 1 ? (
          <FontAwesomeIcon
            className=" player__icon--disabled"
            icon={faForwardStep}
          />
        ) : (
          <Link
            onClick={() => setIndex(index + 1)}
            to={`/song/${songArrayFromArtist[index + 1]._id}`}
          >
            <FontAwesomeIcon className=" player__icon" icon={faForwardStep} />
          </Link>
        )}
      </div>

      <div className="player__progress">
        <p className="player__time">{currentTime}</p>
        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p className="player__time">{duration}</p>
      </div>
      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
