import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animation for word dropping in - removed bounce effect
const dropIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-70px);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

// Enhanced gradient animation for the text
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${(props) => (props.reveal ? "-100%" : "0")});
  border-bottom-left-radius: ${(props) => (props.reveal ? "50% 80px" : "0")};
  border-bottom-right-radius: ${(props) => (props.reveal ? "50% 80px" : "0")};
  transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1),
    border-bottom-left-radius 0.8s ease-in-out,
    border-bottom-right-radius 0.8s ease-in-out;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${(props) =>
      props.animated ? "lineExpand 2s ease-in-out forwards" : "none"};
    animation-delay: ${(props) => props.delay}s;
  }

  @keyframes lineExpand {
    0% {
      width: 0;
      left: 50%;
    }
    100% {
      width: 100%;
      left: 0;
    }
  }
`;

const LineContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  margin-bottom: ${(props) => (props.isFirstLine ? "10px" : "0")};

  @media (max-width: 768px) {
    white-space: normal;
    flex-wrap: wrap;
    max-width: 90%;
    text-align: center;
  }
`;

const Word = styled.span`
  font-family: "Neue Haas Grotesk", sans-serif;
  font-size: 3.2rem;
  font-weight: 700;
  color: white;
  margin: 0 8px;
  opacity: 0;
  transform: translateY(-70px);
  animation: ${dropIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;

  &.animated {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffd633 30%,
      #ffffff 50%,
      #ffd633 70%,
      #ffffff 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(255, 214, 51, 0.3);
    animation: ${dropIn} 0.6s ease-out forwards,
      ${gradientShift} 2s ease-in-out infinite;
    animation-delay: ${(props) => props.delay}s,
      ${(props) => Math.max(0, props.delay - 0.4)}s;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin: 0 6px 6px;
  }
`;

const IntroOverlay = () => {
  const [reveal, setReveal] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Split text into two lines
  const firstLine = "Scale your business".split(" ");
  const secondLine = "without increasing headcount".split(" ");

  // Calculate delays
  const wordDelay = 0.3; // Delay between words
  const lineDelay = 0.8; // Additional delay between lines

  useEffect(() => {
    // Calculate total animation time
    const firstLineTime = firstLine.length * wordDelay;
    const secondLineTime = secondLine.length * wordDelay;
    const pauseTime = lineDelay;
    const viewingTime = 1.5; // Time to view the complete phrase

    const animationDuration =
      firstLineTime + pauseTime + secondLineTime + viewingTime;

    // Set timer to mark animation as complete for the underline effect
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, Math.max(0, firstLineTime + pauseTime + secondLineTime - 1) * 1000);

    // Set timer to reveal the website after the animation completes
    const revealTimer = setTimeout(() => {
      setReveal(true);
    }, animationDuration * 1000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(revealTimer);
    };
  }, [firstLine.length, secondLine.length]);

  return (
    <OverlayContainer reveal={reveal}>
      <TextContainer
        animated={animationComplete}
        delay={Math.max(
          0,
          firstLine.length * wordDelay +
            lineDelay +
            secondLine.length * wordDelay -
            1
        )}
      >
        <LineContainer isFirstLine={true}>
          {firstLine.map((word, index) => (
            <Word
              key={`first-${index}`}
              delay={index * wordDelay}
              className={animationComplete ? "animated" : ""}
            >
              {word}
            </Word>
          ))}
        </LineContainer>

        <LineContainer>
          {secondLine.map((word, index) => (
            <Word
              key={`second-${index}`}
              delay={
                firstLine.length * wordDelay + lineDelay + index * wordDelay
              }
              className={animationComplete ? "animated" : ""}
            >
              {word}
            </Word>
          ))}
        </LineContainer>
      </TextContainer>
    </OverlayContainer>
  );
};

export default IntroOverlay;
