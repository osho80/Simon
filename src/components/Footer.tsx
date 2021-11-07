import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      {/* <HR /> */}
      <FooterContainer>
        <FooterMain>
          <CB>Created by Oshri Hayke</CB>
          <Links>
            <a
              href="https://github.com/osho80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkImg
                width="40px"
                src="../assets/images/github-logo.png"
                alt="Github Logo"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/oshri-hayke-120201116/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkImg
                width="40px"
                src="../assets/images/linkedin-logo.png"
                alt="LinkedIn Logo"
              />
            </a>
          </Links>
        </FooterMain>
        <Technologies>
          <Tech>Technologies:</Tech>
          <JS>JavaScript</JS>
          <TS>Typescript</TS>
          <RE>React</RE>
          <RD>Redux</RD>
          <SC>Styled Components</SC>
        </Technologies>
      </FooterContainer>
    </>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 30px auto 0;
  background-color: #4e5556;
  padding: 10px;
`;

const HR = styled.hr`
  width: 100%;
  display: none;
  @media (max-width: 1440px) {
    display: block;
  }
`;

const FooterMain = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 10px 20px;
`;

const CB = styled.h3`
  margin: 10px 0 0;
  // color: gold;
`;

const Links = styled.div``;

const LinkImg = styled.img`
  margin: 0 30px;
`;

const Technologies = styled.div`
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 20px;
  max-width: 1440px;
`;

const TechItem = styled.p`
  margin: 5px 5px 0;
`;

const Tech = styled(TechItem)`
  color: white;
`;

const JS = styled(TechItem)`
  color: #fcdd0b;
`;

const TS = styled(TechItem)`
  color: #548fcf;
`;
const RE = styled(TechItem)`
  color: #7be0fb;
`;

const RD = styled(TechItem)`
  color: #906cc9;
`;
const SC = styled(TechItem)`
  color: #d67fc7;
`;

export default Footer;
