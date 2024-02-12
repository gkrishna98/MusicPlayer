import React, { useEffect, useState, useContext } from "react";
import { Howl } from "howler";
import { AppConfig } from "../../core/config";
import { PlaylistContext } from "../playerMainPage/playerMainPage";

export default function MusicPlayer() {
  const playlist = useContext(PlaylistContext);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [howlInstance, setHowlInstance] = useState(null);

  useEffect(() => {
    const createHowlInstance = () => {
      const sound = new Howl({
        src: [AppConfig?.baseURL + playlist[currentSongIndex]?.streamUrl],
        html5: true,
        onplay: () => setIsPlaying(true),
        onstop: () => setIsPlaying(false),
        onend: playNextSong,
      });
      setHowlInstance(sound);
      return sound;
    };
    const sound = createHowlInstance();

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [  currentSongIndex]);

  const playSong = () => {
    if (howlInstance) {
      howlInstance?.play();
    }
  };

  const stopSong = () => {
    if (howlInstance) {
      howlInstance.stop();
    }
  };

  const playNextSong = () => {
    setIsPlaying(false);
    howlInstance.stop();
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          AppConfig?.baseURL + playlist[currentSongIndex]?.artworkUrl
        })`,
      }}
    >
      <div>
        <h2>{playlist[currentSongIndex]?.title}</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button disabled={isPlaying} onClick={() => playSong()}>
            {"Play"}
          </button>
          <button disabled={!isPlaying} onClick={() => stopSong()}>
            {"Stop"}
          </button>
          <button onClick={() => playNextSong()}>Next</button>
        </div>
      </div>
    </div>
  );
}
