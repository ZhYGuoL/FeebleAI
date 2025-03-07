import React, { useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Value from "./components/Value";
import Team from "./components/Team";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing the content slightly to ensure smooth transitions
    // This adds a tiny delay after the overlay animation starts to disappear
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <IntroOverlay />
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.8s ease",
          visibility: showContent ? "visible" : "hidden",
        }}
      >
        <Header />
        <main>
          <Hero />
          <Process />
          <Value />
          <Team />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
