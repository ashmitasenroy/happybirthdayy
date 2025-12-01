import React, { useState, useRef } from "react";
import "./BirthdayDecor.css";

// --- ASSETS IMPORT ---
// Ensure these files exist in your src/assets folder
import bgImage from "./assets/birthday_room_bg.jpeg";
import cakeImg from "./assets/birthday_cake.png";
import catImg from "./assets/cute_catt.png";
import spideyImg from "./assets/spidey.png"; 
import balloonLeft from "./assets/ballons_left.png";
import balloonRight from "./assets/ballons_right.png";
import bannerImg from "./assets/birthday_banner.png";
import giftPileImg from "./assets/gift_pile.png";
import confettiImg from "./assets/confetti_pop.png";

// --- GIFT BOX ICONS ---
import giftBox1 from "./assets/gift_box_1.png";
import giftBox2 from "./assets/gift_box_2.png";
import giftBox3 from "./assets/gift_box_3.png";

// --- GIFT CONTENT IMAGES ---
import deepakPic from "./assets/deepak_pic.png"; 
import card1 from "./assets/card_1.jpeg";
import card2 from "./assets/card_2.jpeg";
import card3 from "./assets/card_3.jpeg";
import card4 from "./assets/card_4.jpeg";

// --- AUDIO ---
import hbdSong from "./assets/hbd_song.mp3";

export default function BirthdayDecor() {
  const [started, setStarted] = useState(false);
  const [sequenceStep, setSequenceStep] = useState(0);

  // Modal States
  const [activeGift, setActiveGift] = useState<number | null>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // --- ANIMATION SEQUENCE ---
  const startCelebration = () => {
    setStarted(true);
    
    // Play Audio
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }

    // Step 1: Cat enters (Immediate)
    setSequenceStep(1);

    // Step 2: Cake appears (1.2s later)
    setTimeout(() => setSequenceStep(2), 1200);

    // Step 3: Cat talks "Let's sing"
    setTimeout(() => setSequenceStep(3), 2500);

    // Step 4: Spidey enters
    setTimeout(() => setSequenceStep(4), 4500);

    // Step 5: Spidey talks "Wait let's decorate"
    setTimeout(() => setSequenceStep(5), 5500);

    // Step 6: Decor appears (Balloons, Banner, Gifts)
    setTimeout(() => setSequenceStep(6), 8000);

    // Step 7: Confetti Pops
    setTimeout(() => setSequenceStep(7), 9500);

    // Step 8: Final Text & Scroll Hint
    setTimeout(() => setSequenceStep(8), 11000);
  };

  const scrollToGifts = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGiftClick = (giftId: number) => {
    setActiveGift(giftId);
    setEnvelopeOpen(false); // Reset envelope state every time modal opens
  };

  const closeGiftModal = () => {
    setActiveGift(null);
  };

  return (
    <div className="decor-page">
      <audio ref={audioRef} src={hbdSong} />

      {/* BACKGROUND */}
      <div className="decor-bg" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="glass-overlay"></div>

      {/* --- UPPER SECTION: THE ROOM --- */}
      <div className="room-container">
        
        {/* Absolute Decor (Hidden until Step 6) */}
        <div className={`banner-container ${sequenceStep >= 6 ? 'drop-in' : ''}`}>
           <img src={bannerImg} alt="Banner" className="banner-img" />
        </div>
        <div className={`balloon-left ${sequenceStep >= 6 ? 'float-up' : ''}`}>
           <img src={balloonLeft} alt="Balloons Left" />
        </div>
        <div className={`balloon-right ${sequenceStep >= 6 ? 'float-up' : ''}`}>
           <img src={balloonRight} alt="Balloons Right" />
        </div>

        {/* Main Stage Area */}
        <div className="main-stage">
          
          {/* LEFT COL: CAT */}
          <div className="stage-col">
            <div className="character-wrapper">
              <img 
                src={catImg} 
                alt="Cat" 
                className={`cat-img ${sequenceStep >= 1 ? 'slide-in-left' : 'hidden'}`} 
              />
              {sequenceStep === 3 && (
                <div className="speech-bubble cat-bubble">Let's sing a song! 🎵</div>
              )}
            </div>
          </div>

          {/* CENTER COL: CAKE & BUTTON */}
          <div className="stage-col center-col">
            <img 
              src={cakeImg} 
              alt="Cake" 
              className={`cake-img ${sequenceStep >= 2 ? 'pop-in-cake' : 'hidden'}`} 
            />
            
            {!started && (
              <button className="decorate-btn" onClick={startCelebration}>
                Tap to Decorate 🎉
              </button>
            )}

            {/* Finale HBD Text */}
            {sequenceStep >= 8 && (
              <div className="hbd-finale">
                 <h1 className="firecracker-text">HAPPY BIRTHDAY DEEPAK!</h1>
              </div>
            )}
          </div>

          {/* RIGHT COL: SPIDEY & PILE */}
          <div className="stage-col">
            <div className="character-wrapper">
               <img 
                 src={giftPileImg} 
                 alt="Pile" 
                 className={`gift-pile-img ${sequenceStep >= 6 ? 'fade-in' : 'hidden'}`} 
               />
               <img 
                 src={spideyImg} 
                 alt="Spidey" 
                 className={`spidey-img ${sequenceStep >= 4 ? 'slide-in-right' : 'hidden'}`} 
               />
               {sequenceStep === 5 && (
                 <div className="speech-bubble spidey-bubble">Wait! Let's decorate first! 🕸️</div>
               )}
            </div>
          </div>
        </div>

        {/* Confetti Overlay */}
        {sequenceStep >= 7 && (
          <img src={confettiImg} alt="Confetti" className="confetti-overlay pop-in" />
        )}

        {/* Scroll Indicator */}
        {sequenceStep >= 8 && (
          <div className="scroll-hint" onClick={scrollToGifts}>
            <span>Scroll for Gifts</span>
            <div className="arrow-down">↓</div>
          </div>
        )}
      </div>

      {/* --- LOWER SECTION: CHOOSE GIFTS --- */}
      <div className="gift-selection-section" ref={bottomRef}>
         <h2>Choose Your Gift</h2>
         <div className="gift-grid">
            {[1, 2, 3].map((num) => (
              <div key={num} className="gift-card" onClick={() => handleGiftClick(num)}>
                 <div className="gift-img-wrapper">
                    <img 
                      src={num === 1 ? giftBox1 : num === 2 ? giftBox2 : giftBox3} 
                      alt={`Gift ${num}`} 
                    />
                 </div>
                 <div className="gift-label">Gift {num}</div>
              </div>
            ))}
         </div>
      </div>

      {/* --- POPUP MODALS --- */}
      {activeGift && (
        <div className="modal-overlay">
          <button className="close-modal-btn" onClick={closeGiftModal}>✕</button>
          
          <div className="modal-content">
            
            {/* GIFT 1: CSS ANIMATED ENVELOPE + LETTER */}
            {activeGift === 1 && (
              <div className="gift-content-envelope">
                 <div 
                    className={`css-envelope-wrapper ${envelopeOpen ? 'open' : ''}`} 
                    onClick={() => setEnvelopeOpen(true)}
                 >
                    {/* Envelope Back */}
                    <div className="envelope-back"></div>
                    
                    {/* The Paper / Letter */}
                    <div className="letter-paper">
                       <div className="letter-content">
                          <h3>Dear Kuchipuchi,</h3>
                          <p>
                             I care for you more deeply than I ever learned to say out loud.❤️<br/>
                             You’ve shaped parts of me I didn’t know needed shaping, and I’ll always be grateful for that.
                          </p>
                          <p>
                            You exist in places you’ve never stood in  inside the small choices I make, 
                            in the courage I borrow on difficult days, in the quiet ways I learned to grow.
                          </p>
                          <p>
                             Life has pulled us into different rhythms, but I hope you know this:
                              I’m proud of the person you’re becoming.
                               No matter where you go, some part of my world will still be rooting for you ,
                                 gently, silently, without asking for anything back
                                You're the greatest thing that I have ever lost.
                          </p>
                          <p>
                            Letting you go is part of our journey, 
                            I hope it leads you to the kind of happiness you’ve been searching for. And when you think back, 
                            I hope all you find are warm, easy memories  the kind you smile at without realizing
                          </p>

                          <p className="sign">And for the last time 
                           <p>I love you !!</p> </p>
                       </div>
                    </div>

                    {/* Envelope Pockets (Front) */}
                    <div className="envelope-pocket"></div>
                    <div className="envelope-flap"></div>
                 </div>

                 {!envelopeOpen && <p className="tap-hint">Tap the envelope to open</p>}
              </div>
            )}

            {/* GIFT 2: PHOTO POPUP */}
            {activeGift === 2 && (
              <div className="gift-content-2">
                 <div className="photo-frame pop-in-slow">
                    <img src={deepakPic} alt="Deepak" />
                 </div>
                 <div className="love-text">
                    <h2>Sending Virtual Hugs!</h2>
                    <p>You make my world brighter ✨</p>
                 </div>
                 <div className="floating-hearts">
                    <span>❤️</span><span>💕</span><span>❤️</span>
                 </div>
              </div>
            )}

            {/* GIFT 3: MEMORY CARDS */}
            {activeGift === 3 && (
              <div className="gift-content-3">
                 <h3>Special Memories</h3>
                 <div className="cards-grid">
                    <img src={card1} alt="Mem 1" className="memory-card c1" />
                    <img src={card2} alt="Mem 2" className="memory-card c2" />
                    <img src={card3} alt="Mem 3" className="memory-card c3" />
                    <img src={card4} alt="Mem 4" className="memory-card c4" />
                 </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}