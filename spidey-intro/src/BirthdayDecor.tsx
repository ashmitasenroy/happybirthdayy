import React, { useState, useRef, useEffect } from "react";
import "./BirthdayDecor.css";

// --- ASSETS ---
import bgImage from "./assets/birthday_room_bg.jpeg";     // Pic 12
import cakeImg from "./assets/birthday_cake.jpeg";        // Pic 1
import catImg from "./assets/cute_catt.jpeg";              // Pic 2
import balloonLeft from "./assets/balloons_left.jpeg";    // Pic 3
import balloonRight from "./assets/balloons_right.jpeg";  // Pic 4
import bannerImg from "./assets/birthday_banner.png";    // Pic 6
import giftPileImg from "./assets/gift_pile.png";        // Pic 7 or 8
import confettiImg from "./assets/confetti_pop.png";     // Pic 9

// --- BOTTOM GIFTS ---
import giftBox1 from "./assets/gift_box_1.jpeg"; 
import giftBox2 from "./assets/gift_box_2.jpeg"; 
import giftBox3 from "./assets/gift_box_3.png"; 

// --- AUDIO ---
import hbdSong from "./assets/hbd_song.mp3"; 

export default function BirthdayDecor() {
  const [started, setStarted] = useState(false);
  
  // Animation Sequence States
  const [showCat, setShowCat] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBottomSection, setShowBottomSection] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const lightTheCandle = () => {
    setStarted(true);
    
    // 1. Play Song
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch((e) => console.log("Audio error", e));
    }

    // 2. Sequence Timers
    // Cat slides in from left
    setTimeout(() => setShowCat(true), 1000); 
    // Balloons float up      
    setTimeout(() => setShowBalloons(true), 2500);  
    // Banner drops down/floats in
    setTimeout(() => setShowBanner(true), 4000);    
    // Gift pile slides in from right
    setTimeout(() => setShowGifts(true), 5500);     
    // Confetti overlay pops
    setTimeout(() => setShowConfetti(true), 7000);  
    // Reveal bottom section
    setTimeout(() => setShowBottomSection(true), 8500); 
  };

  const scrollToGifts = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="decor-page">
      <audio ref={audioRef} src={hbdSong} />
      
      {/* BACKGROUND LAYER */}
      <div 
        className="decor-bg" 
        style={{ backgroundImage: `url(${bgImage})` }} 
      />
      <div className="glass-overlay"></div>

      {/* --- UPPER SECTION: THE ROOM --- */}
      <div className="room-container">
        
        {/* TOP DECOR (Absolute Position) */}
        <div className={`banner-container ${showBanner ? 'float-in-top' : ''}`}>
           <img src={bannerImg} alt="Banner" className="banner-img" />
        </div>

        <div className={`balloon-left ${showBalloons ? 'float-up-corner' : ''}`}>
           <img src={balloonLeft} alt="Balloons Left" />
        </div>
        <div className={`balloon-right ${showBalloons ? 'float-up-corner' : ''}`}>
           <img src={balloonRight} alt="Balloons Right" />
        </div>

        {/* MAIN STAGE (Flexbox for perfect no-touching spacing) */}
        <div className="main-stage">
          
          {/* LEFT: CAT */}
          <div className="stage-col left-col">
            <img 
              src={catImg} 
              alt="Cute Cat" 
              className={`cat-img ${showCat ? 'slide-in-left' : 'hidden'}`} 
            />
          </div>

          {/* CENTER: CAKE */}
          <div className="stage-col center-col">
            <img 
              src={cakeImg} 
              alt="Birthday Cake" 
              className="cake-img floating-anim" 
            />
            
            {!started ? (
              <button className="light-candle-btn" onClick={lightTheCandle}>
                Light the Candle 🕯️
              </button>
            ) : (
              <div className="candle-lit-msg">
                Happy Birthday! ✨
              </div>
            )}
          </div>

          {/* RIGHT: GIFTS */}
          <div className="stage-col right-col">
            <img 
              src={giftPileImg} 
              alt="Gift Pile" 
              className={`gift-pile-img ${showGifts ? 'slide-in-right' : 'hidden'}`} 
            />
          </div>
        </div>

        {/* CONFETTI OVERLAY (Full Screen Pop) */}
        {showConfetti && (
          <img src={confettiImg} alt="Confetti" className="confetti-overlay pop-in" />
        )}

        {/* SCROLL INDICATOR */}
        {showBottomSection && (
          <div className="scroll-hint" onClick={scrollToGifts}>
            <span>Scroll for Gifts</span>
            <div className="arrow-down">↓</div>
          </div>
        )}
      </div>

      {/* --- LOWER SECTION: GIFT SELECTION --- */}
      {showBottomSection && (
        <div className="gift-selection-section" ref={bottomRef}>
           <h2>Choose Your Gift</h2>
           
           <div className="gift-grid">
              {/* GIFT 1 */}
              <div className="gift-card">
                 <div className="gift-img-wrapper">
                    <img src={giftBox1} alt="Gift 1" />
                 </div>
                 <div className="gift-label">
                    <span>Gift 1</span>
                 </div>
              </div>

              {/* GIFT 2 */}
              <div className="gift-card">
                 <div className="gift-img-wrapper">
                    <img src={giftBox2} alt="Gift 2" />
                 </div>
                 <div className="gift-label">
                    <span>Gift 2</span>
                 </div>
              </div>

              {/* GIFT 3 */}
              <div className="gift-card">
                 <div className="gift-img-wrapper">
                    <img src={giftBox3} alt="Gift 3" />
                 </div>
                 <div className="gift-label">
                    <span>Gift 3</span>
                 </div>
              </div>

           </div>
        </div>
      )}
    </div>
  );
}