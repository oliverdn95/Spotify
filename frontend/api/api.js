import axios from "axios";

const URL = "https://spotify-xqr3.onrender.com/api";

const responseArtist = await axios.get(`${URL}/artists`);
const responseSong = await axios.get(`${URL}/songs`);

export const artistArray = responseArtist.data;
export const songsArray = responseSong.data;
