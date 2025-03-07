import React from "react";
import styled from "styled-components";
import { placeholderMeeting } from "../assets/images";

const ProcessSection = styled.section`
  padding: 100px 0;
  position: relative;
  background-color: var(--background-alt);
`;

const ProcessContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
`;

const ProcessTitle = styled.h2`
  margin-bottom: 20px;

  span {
    color: var(--primary);
  }
`;

const ProcessSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-light);
`;

const ProcessContent = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ProcessText = styled.div`
  flex: 1;
`;

const ProcessDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProcessSteps = styled.div`
  margin-top: 40px;
`;

const ProcessStep = styled.div`
  display: flex;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 20px;
  flex-shrink: 0;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  color: var(--text-light);
`;

const ProcessImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProcessImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 20px 40px var(--shadow);
`;

const Process = () => {
  const steps = [
    {
      title: "Discovery",
      description:
        "We spend time understanding your business, goals, and pain points.",
    },
    {
      title: "Strategy",
      description:
        "We develop a tailored automation strategy based on your specific needs.",
    },
    {
      title: "Implementation",
      description:
        "Our experts build and integrate the automation solutions seamlessly.",
    },
  ];

  return (
    <ProcessSection id="process">
      <ProcessContainer>
        <SectionHeader>
          <ProcessTitle>
            our process starts with <span>you</span>
          </ProcessTitle>
          <ProcessSubtitle>
            We take the time to understand your business inside and out before
            implementing any solutions
          </ProcessSubtitle>
        </SectionHeader>
        <ProcessContent>
          <ProcessText>
            <ProcessDescription>
              we spend hours drilling down into our client's business developing
              a holistic understanding of their needs.
            </ProcessDescription>
            <ProcessDescription>
              Our team of experts works closely with you to identify pain
              points, inefficiencies, and opportunities for automation that will
              have the biggest impact on your business.
            </ProcessDescription>
            <ProcessSteps>
              {steps.map((step, index) => (
                <ProcessStep key={index}>
                  <StepNumber>{index + 1}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </StepContent>
                </ProcessStep>
              ))}
            </ProcessSteps>
          </ProcessText>
          <ProcessImageContainer>
            <ProcessImage src={placeholderMeeting} alt="Our process" />
          </ProcessImageContainer>
        </ProcessContent>
      </ProcessContainer>
    </ProcessSection>
  );
};

export default Process;
