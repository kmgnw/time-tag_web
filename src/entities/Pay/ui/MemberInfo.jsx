import React from 'react';
import styled from 'styled-components';

export default function MemberInfo({ count }) {
  return (
    <MainLayout>
      <CountText>총 정산 인원</CountText>
      <Count>{count}명</Count>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CountText = styled.p`
  color: #212330;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.35px;
  margin-bottom: -28px;
`;

const Count = styled.p`
  color: #212330;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 40px;
  font-weight: 600;
`;