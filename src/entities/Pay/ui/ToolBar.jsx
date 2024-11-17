import React from 'react';
import styled from 'styled-components';
import BACK from '../../../assets/back.png'
import LOGO from '../../../assets/logo_new_small.svg'
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
        <LogoWrap>
          <Logo src={LOGO} alt="logo" />  
        </LogoWrap>
        
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
  padding: 12px 3px;
`;

const LogoWrap = styled.div`

`

const Logo = styled.img`
position: relative;
top: 1px;
  // width: 28px;
  // height: 28px;
`;

const TitleSection = styled.div`
  width: 88px;
  height: 34px;
  background-color: #424143;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  padding: 3px 6px 3px 4px;
  top: 2px;
`;

const StyledText = styled.div`
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