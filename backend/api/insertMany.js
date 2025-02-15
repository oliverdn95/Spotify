import { artistArray } from "../../Frontend Spotify/src/assets/database/artists.js";
import { songsArray } from "../../Frontend Spotify/src/assets/database/songs.js";
import { db } from "./connect.js";

const newArtistArray = artistArray.map((currentArtistObj) => {
  const newArtistObj = { ...currentArtistObj };
  delete newArtistObj.id;

  return newArtistObj;
});

const newSongArray = songsArray.map((currentSongObj) => {
  const newSongObj = { ...currentSongObj };
  delete newSongObj.id;

  return newSongObj;
});

const responseArtists = await db
  .collection("artists")
  .insertMany(newArtistArray);
const responseSongs = await db.collection("songs").insertMany(newSongArray);

console.log(responseArtists);
console.log(responseSongs);
