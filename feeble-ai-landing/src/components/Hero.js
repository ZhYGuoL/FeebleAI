import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ToolsOrb from "./ToolsOrb";

const HeroSection = styled.section`
  padding: 150px 0 60px;
  position: relative;
  overflow: hidden;
  background-color: #fdf8f2;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  min-height: 80vh;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 150px 0 40px;
    min-height: auto;
  }

  @media (max-width: 768px) {
    30px;
  }

  @media (max-width: 480px) {
    padding: 150px 0 20px;
  }
`;

const DotPattern = styled.div`
  position: absolute;
  right: 0;
  width: 150%;
  height: 200%;
  rotate: -25deg;
  z-index: 1;
  pointer-events: none;
  background-image: radial-gradient(#fff1e1 4px, transparent 4px);
  background-size: 30px 30px;
  opacity: 1;
`;

const HeroContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 500px;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1200px) {
    flex-direction: column;
    text-align: center;
    gap: 60px;
    min-height: auto;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    gap: 40px;
  }

  @media (max-width: 480px) {
    gap: 30px;
    padding: 0 10px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 10px;
  position: relative;
  z-index: 5;

  @media (max-width: 1200px) {
    max-width: 100%;
    align-items: center;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HeroTitle = styled.h1`
  margin-bottom: 24px;
  font-size: 3.8rem;
  line-height: 1.1;
  position: relative;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;

  .line-mask {
    overflow: hidden;
    display: block;
  }

  .line {
    display: block;
    opacity: 0;
    transform: translateY(30px);
    white-space: nowrap;
  }

  .line.animated {
    animation: ${fadeInUp} 0.8s ease-out forwards;
  }

  .line.first {
    animation-delay: 0s;
  }

  .line.second {
    animation-delay: 0.2s;
  }

  .line.third {
    animation-delay: 0.4s;
  }

  .highlight {
    position: relative;
    z-index: 1;
    display: inline-block;
  }

  @media (max-width: 1200px) {
    font-size: 3.5rem;
    white-space: normal;

    .line {
      white-space: normal;
      max-width: 100%;
      overflow-wrap: break-word;
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    white-space: normal;

    .line {
      white-space: normal;
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;

    .line {
      max-width: 100%;
    }
  }
`;

const highlightAnimation = keyframes`
  0% {
    width: 0;
    opacity: 1;
  }
  100% {
    width: 59%;
    opacity: 1;
  }
`;

const HighlightBox = styled.span`
  position: absolute;
  height: 70%;
  background-color: var(--primary);
  bottom: -19px;
  left: 44%;
  z-index: -1;
  width: 0;
  opacity: 0;
  animation: ${highlightAnimation} 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)
    forwards;
  animation-delay: 0.5s;
  animation-play-state: ${(props) => (props.animated ? "running" : "paused")};
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: var(--text-light);
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
    animation-delay: 0.7s;
  }

  @media (max-width: 1200px) {
    font-size: 1.2rem;
    margin-bottom: 35px;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  opacity: 0;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
    animation-delay: 0.9s;
  }

  @media (max-width: 1200px) {
    justify-content: center;
    max-width: 100%;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background-color: var(--primary);
  color: var(--secondary);
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 214, 51, 0.3);
  white-space: nowrap;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 214, 51, 0.4);
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  background-color: transparent;
  color: var(--text-dark);
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  white-space: nowrap;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background-color: var(--background-alt);
    transform: translateY(-2px);
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-width: 50%;
  max-width: 50%;
  margin-right: 0;
  margin-bottom: 0;
  transform: translateY(-10px);
  height: 650px;
  box-sizing: border-box;
  z-index: 10;

  @media (max-width: 1200px) {
    min-width: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-left: 0;
    transform: translateY(0);
    height: 550px;
    padding: 0;
  }

  @media (max-width: 768px) {
    height: 500px;
    transform: translateY(0);
    padding: 0;
  }

  @media (max-width: 480px) {
    height: 450px;
    padding: 0;
  }
`;

const Hero = () => {
  const highlightRef = useRef(null);
  const textRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Start animation when content becomes visible
    const checkVisibility = () => {
      if (document.body.classList.contains("content-visible")) {
        // Start animations immediately without delay
        setAnimated(true);
        return true;
      }
      return false;
    };

    // Check immediately in case content is already visible
    if (!checkVisibility()) {
      // If not visible yet, set up an interval to check
      const intervalId = setInterval(() => {
        if (checkVisibility()) {
          clearInterval(intervalId);
        }
      }, 100);

      // Clean up interval
      return () => clearInterval(intervalId);
    }
  }, []);

  // Split the title into lines for the animation as requested
  const titleLines = ["Automate the parts", "of your business", "that matter."];

  return (
    <HeroSection>
      <DotPattern />
      <HeroContainer>
        <HeroContent>
          <HeroTitle>
            {titleLines.map((line, index) => (
              <span key={index} className="line-mask">
                <span
                  className={`line ${animated ? "animated" : ""} ${
                    index === 0 ? "first" : index === 1 ? "second" : "third"
                  }`}
                >
                  {index === 2 ? (
                    <span
                      className="highlight"
                      ref={textRef}
                      style={{ color: "inherit", position: "relative" }}
                    >
                      {line}
                      <HighlightBox ref={highlightRef} animated={animated} />
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </HeroTitle>
          <HeroSubtitle className={animated ? "animated" : ""}>
            We help businesses streamline their operations through intelligent
            automation solutions that save time, reduce errors, and increase
            productivity.
          </HeroSubtitle>
          <HeroButtons className={animated ? "animated" : ""}>
            <PrimaryButton href="#contact">Get Started</PrimaryButton>
            <SecondaryButton href="#process">Learn More</SecondaryButton>
          </HeroButtons>
        </HeroContent>
        <HeroVisual>
          <ToolsOrb />
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
