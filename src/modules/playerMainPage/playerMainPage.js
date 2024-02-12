import React, { useState, createContext, useEffect } from "react";
import MusicPlayer from "../player/musicPlayer";
import { apiService } from "../../services/services";
import { AppConfig } from "../../core/config";

export const PlaylistContext = createContext([]);

function PlayerMainPage() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    makeCall();
    return()=>{
        setPlaylist([]);
    }
  }, []);

  function makeCall() {
    apiService({
      url: `${AppConfig?.baseURL}/api/v1/tracks?limit=5&cursor=1`,
    }).then((response) => {
      setPlaylist(response?.body?.tracks);
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlaylistContext.Provider value={playlist}>
        <MusicPlayer />
      </PlaylistContext.Provider>
    </div>
  );
}

export default PlayerMainPage;
