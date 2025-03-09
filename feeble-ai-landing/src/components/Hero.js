import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ToolsOrb from "./ToolsOrb";

const HeroSection = styled.section`
  padding: 160px 0 100px;
  position: relative;
  overflow: visible;
  background-color: #fffffe;
  margin-bottom: 50px;
`;

const HeroContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    gap: 60px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 650px;
  width: 100%;

  @media (max-width: 992px) {
    max-width: 100%;
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

  @media (max-width: 992px) {
    font-size: 3.5rem;
    white-space: normal;

    .line {
      white-space: normal;
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    white-space: normal;

    .line {
      white-space: normal;
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

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
    animation-delay: 0.9s;
  }

  @media (max-width: 992px) {
    justify-content: center;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 214, 51, 0.4);
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

  &:hover {
    background-color: var(--background-alt);
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: visible;
  min-width: 50%;
  margin-right: -30px;
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
