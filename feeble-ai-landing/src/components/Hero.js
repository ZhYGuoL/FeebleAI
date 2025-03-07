import React from "react";
import styled from "styled-components";
import ToolsOrb from "./ToolsOrb";

const HeroSection = styled.section`
  padding: 160px 0 100px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(255, 214, 51, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const HeroContainer = styled.div`
  max-width: 1200px;
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
  max-width: 600px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  margin-bottom: 24px;
  font-size: 4rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  color: var(--text-light);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;

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
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <HeroTitle>
            automate the parts of your business that{" "}
            <span className="highlight">matter.</span>
          </HeroTitle>
          <HeroSubtitle>
            We help businesses streamline their operations through intelligent
            automation solutions that save time, reduce errors, and increase
            productivity.
          </HeroSubtitle>
          <HeroButtons>
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
