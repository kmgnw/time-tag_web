import React from 'react';
import styled from 'styled-components';
import BACK from '../../../assets/back.png'
import LOGO from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function ToolBar({ title }) {
  const navigate = useNavigate();
  
  const handleCloseButtonClick = () => {
    navigate(-1); 
  }

  return (
    <MainLayout>
      {/* Close Button */}
      <CloseButtonWrapper style={{ opacity: 0 }} onClick={handleCloseButtonClick}>
        <CloseButton src={BACK} alt="back button" />
      </CloseButtonWrapper>

      {/* Title Section */}
      <TitleSection>
        <Logo src={LOGO} alt="logo" />
        <StyledText>{title}</StyledText>
      </TitleSection>

      {/* Invisible Close Button to balance layout */}
      <CloseButtonWrapper style={{ opacity: 0 }}>
        <CloseButton src={BACK} alt="invisible back button" />
      </CloseButtonWrapper>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  z-index: 10;
  padding: 12px 20px;
`;

const Logo = styled.img`
  width: 28px;
  height: 28px;
`;

const TitleSection = styled.div`
  width: 88px;
  height: 34px;
  background-color: #FFAC30;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 3px 12px;
  position: relative;
  top: 2px;
`;

const StyledText = styled.span`
  color: #FFF;
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
`;

const CloseButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: ${({ opacity }) => opacity || '1'};
`;

const CloseButton = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 24px;
`;