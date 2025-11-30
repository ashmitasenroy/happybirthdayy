import React, { useState, useEffect, useRef } from "react";
import "./SpideyIntro.css";

// --- EXISTING ASSETS ---
import spideyHang from "./assets/spidey_hang.png";
import cityBg from "./assets/city_night.jpeg"; 
import batmanStand from "./assets/batman_stand.png";
import spideyHeart from "./assets/spidey_heart.png";
import batmanCute from "./assets/batman_cute.png";

// --- NEW SCENE ASSETS ---
import blackPanther from "./assets/black_panther.png";
import cuteCat from "./assets/cute_cat.png"; // Reusing cute cat if needed or different one
import duoImg from "./assets/spidey_batman_duo.png";
import natureBg from "./assets/nature_bg.jpeg"; 
import thomYorke from "./assets/thom_yorke.png";
import radioheadGroup from "./assets/radiohead_group.png";
import starsBg from "./assets/stars_bg.jpeg"; 

// --- MUSIC PLAYER ASSETS ---
import album1 from "./assets/album_radiohead.jpeg"; 
import album2 from "./assets/album_beachhouse.jpg";
import album3 from "./assets/album_nin.jpg";

// --- MEDIA IMPORTS ---
import videoFile from "./assets/intro_video.mp4";
import weirdSong from "./assets/weird.mp3"; 
import song1 from "./assets/song1.mp3";
import song2 from "./assets/song2.mp3";
import song3 from "./assets/song3.mp3";

const PLAYLIST = [
  { title: "Daydreaming", artist: "Radiohead", cover: album1, src: song1 },
  { title: "Black Car", artist: "Beach House", cover: album2, src: song2 },
  { title: "This Isn't The Place", artist: "Nine Inch Nails", cover: album3, src: song3 },
];

interface SpideyIntroProps {
  onExplore: () => void;
}

export default function SpideyIntro({ onExplore }: SpideyIntroProps) {
  // SCENE STATE: 0=Intro, 1=LightsOn, 2=CatFlip, 3=Video, 4=RadioheadChat, 5=MusicPlayer
  const [scene, setScene] = useState(0); 
  
  // SUB-STEPS
  const [step, setStep] = useState(0);       
  const [chatStep, setChatStep] = useState(0); 
  const [catStep, setCatStep] = useState(0);   
  const [rhStep, setRhStep] = useState(0);     

  // PLAYER STATE
  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // --- SCENE 0: INTRO TIMERS ---
  useEffect(() => {
    if (scene === 0) {
      const timers = [
        setTimeout(() => setStep(1), 2000),
        setTimeout(() => setStep(2), 4000),
        setTimeout(() => setStep(3), 6000),
        setTimeout(() => setStep(4), 8000),
        setTimeout(() => setStep(5), 10000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [scene]);

  // --- SCENE 1: BATMAN CHAT ---
  useEffect(() => {
    if (scene === 1) {
      const timers = [
        setTimeout(() => setChatStep(1), 1500),
        setTimeout(() => setChatStep(2), 4000),
        setTimeout(() => setChatStep(3), 6500),
        setTimeout(() => setChatStep(4), 9000),
        setTimeout(() => setScene(2), 12000), 
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [scene]);

  // --- SCENE 2: CAT FLIP ---
  useEffect(() => {
    if (scene === 2) {
      const timers = [
        setTimeout(() => setCatStep(1), 1000), 
        setTimeout(() => setCatStep(2), 4000), 
        setTimeout(() => setCatStep(3), 7000), 
        setTimeout(() => setScene(3), 10000),  
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [scene]);

  // --- SCENE 3: VIDEO & AUDIO SYNC ---
  useEffect(() => {
    if (scene === 3) {
      const introAudio = new Audio(weirdSong);
      introAudio.volume = 1.0; 
      introAudio.currentTime = 0;
      introAudio.play().catch(e => console.log("Audio block", e));

      const timer = setTimeout(() => {
        introAudio.pause();
        introAudio.currentTime = 0; 
        setScene(4);
      }, 30000); 

      return () => {
        clearTimeout(timer);
        introAudio.pause();
      };
    }
  }, [scene]);

  // --- SCENE 4: RADIOHEAD CHAT ---
  useEffect(() => {
    if (scene === 4) {
      const timers = [
        setTimeout(() => setRhStep(1), 1000), 
        setTimeout(() => setRhStep(2), 5000), 
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [scene]);

  // --- SCENE 5: MUSIC PLAYER LOGIC ---
  useEffect(() => {
    if (scene === 5 && audioPlayerRef.current) {
      audioPlayerRef.current.src = PLAYLIST[currentSongIdx].src;
      audioPlayerRef.current.volume = 1.0; 
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSongIdx, scene]);

  const togglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIdx((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevSong = () => {
    setCurrentSongIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const onTimeUpdate = () => {
    if (audioPlayerRef.current) {
      setCurrentTime(audioPlayerRef.current.currentTime);
      setDuration(audioPlayerRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const getChatImage = () => {
    if (chatStep <= 1) return batmanStand;
    if (chatStep <= 3) return spideyHeart;
    return batmanCute;
  };

  const getCatSceneImage = () => {
    if (catStep === 1) return blackPanther;
    if (catStep === 2) return cuteCat;
    return duoImg;
  };

  return (
    <div className="main-container">
      <audio ref={audioPlayerRef} onEnded={nextSong} onTimeUpdate={onTimeUpdate} />

      {/* SCENE 0 */}
      {scene === 0 && !step && (
        <div className="start-screen">
          <button onClick={() => setStep(1)} className="start-btn">Start Show</button>
        </div>
      )}

      {scene === 0 && step > 0 && (
        <div className="spotlight-scene">
          <div className="spotlight-overlay"></div>
          <div className="spidey-hang-wrapper">
             <img src={spideyHang} alt="Spidey" className="spidey-hang-img" />
          </div>
          <div className="bubbles-container">
            {step >= 1 && <div className="bubble b1">Hi</div>}
            {step >= 2 && <div className="bubble b2">there</div>}
            {step >= 3 && <div className="bubble b3">Deepak❤️</div>}
            {step >= 4 && <div className="bubble b4">Turn on the lights please?</div>}
          </div>
          {step >= 5 && (
            <button className="lights-btn" onClick={() => setScene(1)}>Turn On Lights</button>
          )}
        </div>
      )}

      {/* SCENE 1 */}
      {scene === 1 && (
        <div className="city-scene">
          <img src={cityBg} alt="City" className="city-bg" />
          <div className="glass-sheet"></div>
          <div className="chat-layout">
            <div className="chat-bubble-glass fade-in-up">
              {chatStep === 0 && "..."}
              {chatStep === 1 && "Batman: Spideyyyy!!! Did you wish him?"}
              {chatStep === 2 && "Spidey: Oh noooo!! I---"}
              {chatStep === 3 && "Spidey: I-- I am gay for you and yeah Happy Anniversary!"}
              {chatStep === 4 && "Batman: Idiot! That's not what today is , wait what -- ehh"}
            </div>
            <div className="character-stage">
              <img key={chatStep} src={getChatImage()} className="active-character pop-in" alt="char" />
            </div>
          </div>
        </div>
      )}

      {/* SCENE 2 */}
      {scene === 2 && (
        <div className="city-scene flip-animation-active">
          <img src={cityBg} alt="City" className="city-bg" />
          <div className="glass-sheet"></div>
          <div className="chat-layout">
            <div className="chat-bubble-glass fade-in-up">
               {catStep === 1 && "Black Panther: You guys are useless..."}
               {catStep === 2 && "Cat: *sighs* Now we gotta call someone else."}
               {catStep === 3 && "Batman & Spidey: Whooooo???"}
            </div>
            <div className="character-stage">
               <img key={catStep} src={getCatSceneImage()} className="active-character pop-in" alt="char" />
            </div>
          </div>
        </div>
      )}

      {/* SCENE 3: VIDEO */}
      {scene === 3 && (
        <div className="video-scene">
          <video autoPlay muted loop className="fullscreen-video">
            <source src={videoFile} type="video/mp4" />
          </video>
          <div className="video-overlay-text">
             <h2>Listening...</h2>
          </div>
        </div>
      )}

      {/* SCENE 4: RADIOHEAD CHAT */}
      {scene === 4 && (
        <div className="city-scene">
          <img src={natureBg} alt="Nature" className="city-bg" />
          <div className="glass-sheet"></div>
          <div className="chat-layout">
            <div className="chat-bubble-glass fade-in-up">
               {rhStep === 1 && "Thom Yorke: The hardest part about being in Radiohead is listening to my own music."}
               {rhStep === 2 && "Radiohead: Hi dude ignore him , Happy Birthdayy!! have a great one"}
            </div>
            <div className="character-stage">
               <img src={rhStep === 1 ? thomYorke : radioheadGroup} className="active-character pop-in" alt="radiohead" />
            </div>
            {rhStep === 2 && (
               <button className="explore-btn" onClick={() => setScene(5)}>Let's Party</button>
            )}
          </div>
        </div>
      )}

      {/* SCENE 5: MUSIC PLAYER */}
      {scene === 5 && (
        <div className="music-player-scene">
           <img src={starsBg} alt="Stars" className="city-bg" />
           <div className="glass-sheet-dark"></div>
           
           <div className="apple-player-container fade-in-up">
              <div className="album-art-wrapper">
                 <img src={PLAYLIST[currentSongIdx].cover} alt="Album" className={`album-art ${isPlaying ? 'playing' : ''}`} />
              </div>
              <div className="track-info">
                 <h2>{PLAYLIST[currentSongIdx].title}</h2>
                 <p>{PLAYLIST[currentSongIdx].artist}</p>
              </div>
              <div className="progress-bar-container">
                 <input 
                   type="range" 
                   min={0} 
                   max={duration || 0} 
                   value={currentTime} 
                   onChange={handleSeek}
                   className="seek-slider"
                 />
              </div>
              <div className="time-stamps">
                 <span>{formatTime(currentTime)}</span>
                 <span>{formatTime(duration)}</span>
              </div>
              <div className="controls">
                 <button onClick={prevSong} className="control-btn">⏮</button>
                 <button onClick={togglePlay} className="play-pause-btn">
                    {isPlaying ? "⏸" : "▶"}
                 </button>
                 <button onClick={nextSong} className="control-btn">⏭</button>
              </div>
           </div>
            
           {/* THIS BUTTON TRIGGERS THE BIRTHDAY DECOR PAGE */}
           <button className="explore-now-btn" onClick={onExplore}>
             Explore Now
           </button>
        </div>
      )}
    </div>
  );
}