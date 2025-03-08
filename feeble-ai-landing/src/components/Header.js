import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 100;
  box-shadow: 0 2px 10px var(--shadow);
  transition: all 0.3s ease;

  ${(props) =>
    props.scrolled &&
    `
    padding: 15px 0;
    box-shadow: 0 5px 20px var(--shadow);
  `}
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoFeeble = styled.span`
  font-family: "Neue Haas Grotesk", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd633;
  line-height: 1;
`;

const LogoAgency = styled.span`
  font-family: "Neue Haas Grotesk", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  line-height: 1;

  span.automation {
    color: #333;
  }

  span.agency {
    color: #999;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  font-size: 1.05rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--primary);

    &::after {
      width: 100%;
    }
  }
`;

const Button = styled.a`
  background-color: var(--primary);
  color: var(--secondary);
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 214, 51, 0.3);
  display: inline-block;
  text-align: center;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 214, 51, 0.4);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo>
          <LogoFeeble>feeble</LogoFeeble>
          <LogoAgency>
            <span className="automation">automation</span>
            <span className="agency">agency</span>
          </LogoAgency>
        </Logo>
        <Nav>
          <NavLink href="#process">Our Process</NavLink>
          <NavLink href="#team">Team</NavLink>
          <Button href="#contact">Contact Us</Button>
        </Nav>
        <MobileMenuButton aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
