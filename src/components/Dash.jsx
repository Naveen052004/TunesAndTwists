import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Button, Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import "../App.css";
import PlaylistsComponent from "./PlaylistsComponent";
import { MdClear } from "react-icons/md";
// require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: "COPY YOUR CLIENT ID",
});

const getToken = async (code, state) => {
  const access = await fetch("http://localhost:5000/callback", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      code: code,
      state: state,
    },
  })
    .then((res) => res.json()).then((data) => {return data.access_token;})
    .catch((error) => {});
  return access;
};
const handleToken = async () => {
  try {
    const token = await getToken(urlParams.get("code"), urlParams.get("state"));
    // document.cookie
    return token;
  } catch (err) {
    window.location.href = 'http://localhost:3000/'
    // console.log(err);
  }
};


const url = window.location.href;
const urlParams = new URLSearchParams(url.split("?")[1]);
const accessToken = (urlParams.get("code"))?(await handleToken()):null;
// window.history.pushState({},null,'/');
export default function Dash({ code }) {
  const [nav, setNav] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [playingTrack, setPlayingTrack] = useState({});
  const [likedResults, setLikedResults] = useState(null);
  const [isPlaylist, setIsPlaylist] = useState(false);
  function chooseTrack(track) {
    setPlayingTrack(track);
    // setSearch('')
  }
  // useEffect(()=>{
  //   if(!accessToken)  return;
  spotifyApi.setAccessToken(accessToken);
  // });
  useEffect(() => {
    if (nav === 0) {
      setIsPlaylist(false);
      likedSongs();
    } else if (nav === 1) {
      setIsPlaylist(false);
      recentSongs();
    } else if (nav === 2) {
      console.log("Nav is 3");
      setIsPlaylist(true);
      usersPlaylists();
    } else {
      console.log("Nav is 4");
      getQueue();
    }
  }, [nav]);

  const getQueue = async () => {
    let results;
    await axios
      .get("https://api.spotify.com/v1/me/player/queue", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => (results = response.data.queue));
    let current = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    try {
      current = current.data.item.name;
      let que = results
        .map((item) => {
          if (item.name !== current) {
            return {
              artist: item.artists[0].name,
              title: item.name,
              uri: item.uri,
              albumImage: item.album.images[0].url,
            };
          } else return null;
        })
        .filter((item) => item !== null);
      setSearchResult(que);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    setIsPlaylist(false);
    if (!search) return setSearchResult([]);
    // if(!accesstoken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      const results = res.body.tracks.items.map((track) => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumImage: track.album.images[0].url,
        };
      });
      // console.log(searchResult);
      setSearchResult(results);
    });
    return () => (cancel = true);
  }, [search]);

  const likedSongs = async () => {
    let results;
    await axios
      .get("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setLikedResults(response.data.items))
      .catch((err) => console.log(err));
  };

  const recentSongs = async () => {
    let results;
    await axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        results = response.data.items;
      })
      .catch((err) => console.log(err));
    // console.log(results);
    let recentPlayed = results.map((item) => {
      return {
        artist: item.track.artists[0].name,
        title: item.track.name,
        uri: item.track.uri,
        albumImage: item.track.album.images[0].url,
      };
    });
    setSearchResult(recentPlayed);
  };

  const usersPlaylists = async () => {
    setIsPlaylist(true);
    let results;
    await axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => (results = response.data.items))
      .catch((err) => console.log(err));
    let listPlaylist = results.map((item) => {
      return {
        title: item.name,
        uri: item.id,
        albumImage: item.images[0].url,
      };
    });
    // console.log(results)
    // console.log(searchResult);
    setSearchResult(listPlaylist);
  };

  const getPlaylists = async (playlist_id) => {
    let results;
    await axios
      .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => (results = response.data.tracks.items))
      .catch((err) => console.log(err));
    // console.log(results);
    let cnt = 0;
    let listSongs = results
      .map((item) => {
        try {
          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumImage: item.track.album.images[0].url,
          };
        } catch (err) {
          return null;
        }
      })
      .filter((item) => item !== null);
    setIsPlaylist(false);
    setSearchResult(listSongs);
  };

  const addToQueue = async (track) => {
    let temp = encodeURIComponent(track);
    try {
      await axios
        .post(
          `https://api.spotify.com/v1/me/player/queue?uri=${temp}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(console.log("Added"));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (likedResults != null) {
      // console.log('Inside use Effect')
      // console.log(likedResults)
      const results = likedResults.map((obj) => {
        return {
          artist: obj.track.artists[0].name,
          title: obj.track.name,
          uri: obj.track.uri,
          albumImage: obj.track.album.images[0].url,
        };
      });
      setSearchResult(results);
    }
  }, [likedResults]);
  const showDiv = () => {
    document.querySelector(".music-player").classList.toggle("show");
  };
  return (
    <>
      {/* <button onClick={showDiv}>GoIn</button>
      <button onClick={showDiv}>Show</button> */}
      <Container
        className=" d-flex flex-column py-2"
        style={{ height: "76vh", margin: "0" }}
      >
        <Form.Control
          className="Searching"
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="flex-grow-1 my-2 Searchingg"
          style={{ overflowY: "auto" }}
        >
          <div style={{ display: "flex" }}>
            <Button
              className="div2Buttons"
              variant="ms-2 mt-1"
              onClick={() => setNav(0)}
            >
              Liked Songs{" "}
            </Button>
            <Button
              className="div2Buttons"
              variant="ms-2 mt-1"
              onClick={() => setNav(1)}
            >
              Recently
            </Button>
            <Button
              className="div2Buttons"
              variant="ms-2 mt-1"
              onClick={() => setNav(2)}
            >
              PlayLists
            </Button>
            <Button
              className="div2Buttons"
              variant="ms-2 mt-1"
              onClick={() => setNav(3)}
            >
              MyQueue
            </Button>
            <Button
              style={{ border: "none" }}
              variant="outline-secondary ms-3 mt-1"
              onClick={() => {
                setNav(-1);
                setSearchResult([]);
              }}
            >
              <MdClear />
            </Button>
          </div>
          <div className="d-flex flex-column py-2">
            {searchResult.map((track) => {
              return !isPlaylist ? (
                <TrackSearchResult
                  addToQueue={addToQueue}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ) : (
                <PlaylistsComponent
                  track={track}
                  getPlaylists={getPlaylists}
                ></PlaylistsComponent>
              );
            })}
          </div>
        </div>
        <div></div>
      </Container>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      {/* <div>{code}</div> */}
    </>
  );
}
