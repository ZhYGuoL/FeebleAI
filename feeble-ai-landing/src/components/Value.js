import React from "react";
import styled from "styled-components";
import { placeholderDashboard } from "../assets/images";

const ValueSection = styled.section`
  padding: 100px 0;
  position: relative;
  background: linear-gradient(
    180deg,
    var(--background) 0%,
    var(--background-alt) 100%
  );
`;

const ValueContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
`;

const ValueTitle = styled.h2`
  margin-bottom: 20px;

  span {
    color: var(--primary);
  }
`;

const ValueSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 20px;
`;

const ValueContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ValueStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 80px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background-color: white;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 30px var(--shadow);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: var(--text-dark);
  font-weight: 500;
`;

const ValueImageContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px var(--shadow);
`;

const ValueImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ValueFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 214, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 25px;
    height: 25px;
    color: var(--primary);
  }
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h3`
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

const Value = () => {
  const stats = [
    { number: "85%", label: "Time Saved on Manual Tasks" },
    { number: "60%", label: "Reduction in Processing Errors" },
    { number: "3.5x", label: "Return on Investment" },
  ];

  const features = [
    {
      title: "Streamlined Operations",
      description:
        "Eliminate repetitive tasks and streamline your business operations for maximum efficiency.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Real-time Analytics",
      description:
        "Get real-time insights into your business performance with custom dashboards and reports.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Scalable Solutions",
      description:
        "Our automation solutions grow with your business, adapting to your changing needs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Seamless Integration",
      description:
        "Integrate with your existing tools and systems for a smooth transition to automation.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <ValueSection>
      <ValueContainer>
        <SectionHeader>
          <ValueTitle>
            implement <span>value</span>
          </ValueTitle>
          <ValueSubtitle>
            value-add solutions that help you and your team execute where your
            time means that most
          </ValueSubtitle>
        </SectionHeader>

        <ValueContent>
          <ValueStats>
            {stats.map((stat, index) => (
              <StatItem key={index}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </ValueStats>

          <ValueImageContainer>
            <ValueImage
              src={placeholderDashboard}
              alt="Dashboard visualization"
            />
          </ValueImageContainer>

          <ValueFeatures>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </ValueFeatures>
        </ValueContent>
      </ValueContainer>
    </ValueSection>
  );
};

export default Value;
