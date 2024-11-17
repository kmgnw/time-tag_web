import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export default function Selector() {
  const [isTimeZoneFocus, setIsTimeZoneFocus] = useState('1/N');
  const timeZone = ['1/N', '먹은만큼'];

  const selectSwitch = (item) => {
    setIsTimeZoneFocus(item);
  };

  return (
    <MainLayout>
      <TimeZoneContainer>
        <AnimatedSelectedBackground activePosition={isTimeZoneFocus === '1/N' ? 0 : 120} />
        {timeZone.map((item, index) => (
          <TimeZoneButton
            key={index}
            onClick={() => selectSwitch(item)}
          >
            <TimeZoneText isFocused={isTimeZoneFocus === item}>
              {item}
            </TimeZoneText>
          </TimeZoneButton>
        ))}
      </TimeZoneContainer>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  margin-top: 51px;
`;

const TimeZoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  height: 56px;
  margin-bottom: 24px;
  border-radius: 100px;
  border: 1px solid #e5e5ec;
  background: #fff;
  position: relative;
`;

const slideAnimation = (position) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${position}px);
  }
`;

const AnimatedSelectedBackground = styled.div`
  position: absolute;
  width: 110px;
  height: 48px;
  background-color: #18CD73;
  border-radius: 24px;
  top: 3px;
  left: 3px;
  transform: translateX(${({ activePosition }) => activePosition}px);
  animation: ${({ activePosition }) => slideAnimation(activePosition)} 0.2s ease forwards;
  z-index: 1;
`;

const TimeZoneButton = styled.button`
  width: 120px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Ensure the text stays above the sliding background */
`;

const TimeZoneText = styled.span`
  color: ${({ isFocused }) => (isFocused ? '#fff' : '#767676')};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  font-family: Pretendard, sans-serif;
  line-height: 22px;
`;