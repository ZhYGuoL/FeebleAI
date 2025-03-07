import React from "react";
import styled from "styled-components";
import {
  googleLogo,
  airtableLogo,
  zapierLogo,
  slackLogo,
  notionLogo,
  twilioLogo,
  marketoLogo,
} from "../assets/images";

const ToolsSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

const ToolsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
`;

const ToolsTitle = styled.h2`
  margin-bottom: 20px;

  span {
    color: var(--primary);
  }
`;

const ToolsSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 20px;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
`;

const ToolItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 30px var(--shadow);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ToolLogo = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const ToolName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ToolDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const ToolsNote = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  text-align: center;
  color: var(--text-light);
  margin-top: 40px;
`;

const ToolsFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 80px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 30px var(--shadow);
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 214, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 30px;
    height: 30px;
    color: var(--primary);
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

const Tools = () => {
  // Tool data with imported logos
  const tools = [
    {
      name: "Google",
      logo: googleLogo,
      description: "Leverage Google's suite of tools for seamless integration",
    },
    {
      name: "Airtable",
      logo: airtableLogo,
      description: "Flexible database that adapts to your workflow",
    },
    {
      name: "Zapier",
      logo: zapierLogo,
      description: "Connect your apps and automate workflows",
    },
    {
      name: "Slack",
      logo: slackLogo,
      description: "Streamline team communication and notifications",
    },
    {
      name: "Notion",
      logo: notionLogo,
      description: "All-in-one workspace for notes, tasks, and databases",
    },
    {
      name: "Twilio",
      logo: twilioLogo,
      description: "Add messaging, voice, and video to your applications",
    },
  ];

  const features = [
    {
      title: "Custom Integrations",
      description:
        "We build custom integrations between all your business tools to create a seamless workflow.",
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
      title: "Data Automation",
      description:
        "Automate data entry, processing, and reporting to save time and reduce errors.",
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
      title: "Workflow Optimization",
      description:
        "Identify bottlenecks and optimize your business processes for maximum efficiency.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <ToolsSection id="tools">
      <ToolsContainer>
        <SectionHeader>
          <ToolsTitle>
            then we <span>build</span>
          </ToolsTitle>
          <ToolsSubtitle>
            if a human can do it, we can automate it.
            <br />
            some of our favorite tools include:
          </ToolsSubtitle>
        </SectionHeader>
        <ToolsGrid>
          {tools.map((tool, index) => (
            <ToolItem key={index}>
              <ToolLogo>
                <img src={tool.logo} alt={tool.name} />
              </ToolLogo>
              <ToolName>{tool.name}</ToolName>
              <ToolDescription>{tool.description}</ToolDescription>
            </ToolItem>
          ))}
        </ToolsGrid>
        <ToolsNote>...just to name a few</ToolsNote>

        <ToolsFeatures>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureItem>
          ))}
        </ToolsFeatures>
      </ToolsContainer>
    </ToolsSection>
  );
};

export default Tools;
