import React, { useState } from "react";
import SpideyIntro from "./SpideyIntro";
import BirthdayDecor from "./BirthdayDecor";
import "./App.css"; // standard css

function App() {
  // 'intro' shows Spidey/Batman, 'birthday' shows the Cake/Room
  const [page, setPage] = useState<'intro' | 'birthday'>('intro');

  return (
    <div className="app-wrapper">
      {page === 'intro' ? (
        <SpideyIntro onExplore={() => setPage('birthday')} />
      ) : (
        <BirthdayDecor />
      )}
    </div>
  ); 
}

export default App;