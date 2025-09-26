import { useEffect, useState } from 'react'
import './index.css'
import IntroScreen from './components/IntroScreen'
import { Howl } from 'howler'
import SideSelection from './components/SideSelection';
import Arena from './components/Arena';

// sound manager
const bgMusic = {
  intro: new Howl({src: ["/music/intro/intro_theme.mp3"], loop: true, volume: 0.4}),
  arena: new Howl({src: ["/music/intro/arena_theme.mp3"], loop: true, volume: 0.4}),
};

function App() {
  const [screen, setScreen] = useState("intro");    // screens intro | Selection | Arena
  const [playerColor, setPlayerColor] = useState(null);   // "red" vs "blue"
  const [musicStarted, setMusicStarted] = useState(false);

  function startIntroMusic() {
    if (!musicStarted) {
      bgMusic.intro.play();
      setMusicStarted(true);
    }
    setScreen("select");
  }

  function goToArena(color) {
    Object.values(bgMusic).forEach((track) => track.stop());
    bgMusic.arena.play();
    setPlayerColor(color);
    setScreen("arena");
  }

  return (
    <div className="w-screen h-screen bg-black text-white">
      {screen === "intro" && (
        <IntroScreen onStart={() => startIntroMusic()} />
      )}

      {screen === "select" && (
        <SideSelection 
          onSelect={(color) => {
            setPlayerColor(color);
            setScreen("arena");
          }}
        />
      )}

      {screen === "arena" && (
        <Arena 
          playerColor={playerColor}
          onExit={() => {
            setScreen("intro");
            setPlayerColor("null");
          }}
        />
      )}
    </div>
  )
}

export default App
