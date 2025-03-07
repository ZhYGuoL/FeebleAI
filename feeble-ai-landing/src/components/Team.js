import React from "react";
import styled from "styled-components";
import { placeholderPerson } from "../assets/images";

const TeamSection = styled.section`
  padding: 100px 0;
  position: relative;
  background-color: var(--background);
`;

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
`;

const TeamTitle = styled.h2`
  margin-bottom: 20px;
`;

const TeamSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-light);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const TeamImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    z-index: 1;
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${TeamCard}:hover & {
    transform: scale(1.05);
  }
`;

const TeamInfo = styled.div`
  padding: 25px;
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const TeamRole = styled.p`
  font-size: 1rem;
  color: var(--primary);
  margin-bottom: 15px;
  font-weight: 500;
`;

const TeamBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-light);
`;

const TeamSocial = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--background-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dark);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary);
    color: var(--secondary);
    transform: translateY(-3px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Team = () => {
  // Team member data
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Automation expert with 10+ years of experience helping businesses streamline their operations.",
      image: placeholderPerson,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:jane@feebleai.com",
      },
    },
    {
      name: "John Smith",
      role: "CTO",
      bio: "Technical wizard who can connect any API and automate even the most complex workflows.",
      image: placeholderPerson,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:john@feebleai.com",
      },
    },
    {
      name: "Emily Johnson",
      role: "Head of Client Success",
      bio: "Dedicated to ensuring our clients achieve their automation goals and see real business impact.",
      image: placeholderPerson,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:emily@feebleai.com",
      },
    },
    {
      name: "Michael Chen",
      role: "Automation Specialist",
      bio: "Skilled in creating custom automation solutions that save businesses thousands of hours.",
      image: placeholderPerson,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:michael@feebleai.com",
      },
    },
  ];

  return (
    <TeamSection id="team">
      <TeamContainer>
        <SectionHeader>
          <TeamTitle>Meet Our Team</TeamTitle>
          <TeamSubtitle>
            Our experts are passionate about helping businesses automate their
            workflows and focus on what truly matters.
          </TeamSubtitle>
        </SectionHeader>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <TeamImageContainer>
                <TeamImage src={member.image} alt={member.name} />
              </TeamImageContainer>
              <TeamInfo>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <TeamBio>{member.bio}</TeamBio>
                <TeamSocial>
                  <SocialLink
                    href={member.social.linkedin}
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </SocialLink>
                  <SocialLink href={member.social.twitter} aria-label="Twitter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </SocialLink>
                  <SocialLink href={member.social.email} aria-label="Email">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </SocialLink>
                </TeamSocial>
              </TeamInfo>
            </TeamCard>
          ))}
        </TeamGrid>
      </TeamContainer>
    </TeamSection>
  );
};

export default Team;
