import React from 'react';
import styled from 'styled-components';
import MemberCell from '../entities/PayProcessing/ui/MemberCell';
import { useNavigate } from 'react-router-dom';

export default function PayCompleted() {
    const members = ['권*남', '김*수', '박*영', '이*민', '최*준', '장*희', '정*아', '오*석'];
    const navigate = useNavigate();

    function btnClickHandler() {
        navigate('/');
    }

    return (
        <MainLayout>
            <MainTitle>정산이<br />완료되었어요.</MainTitle>
            <Price>총 금액: 100,000원</Price>

            {members.map((member, index) => (
                <MemberCell key={index} name={member} price="20,000원" />
            ))}

            <CompleteButtonWrap>
                <CompleteButton onClick={btnClickHandler}>
                    <CompleteText>완료</CompleteText>
                </CompleteButton>
            </CompleteButtonWrap>
        </MainLayout>
    );
}

const MainLayout = styled.div`
  padding: 0px 20px;
`;

const MainTitle = styled.div`
    margin-top: 110px;
    margin-bottom: 24px;
    color: #212330;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 44px; /* 122.222% */
    letter-spacing: -0.9px;
`;

const Price = styled.p`
  font-size: 20px;
  font-family: "Pretendard-400";
  margin-bottom: 32px;
`;

const CompleteButtonWrap = styled.div`
  width: 100%;
  max-width: 86%;  // Adjust based on design requirements
  position: fixed;
  bottom: 20px;
  padding: 0 20px;  // Adjust padding as needed
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const CompleteButton = styled.button`
  width: 100%;
  padding: 0 20px;
  background-color: #ffac30;
  height: 56px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompleteText = styled.span`
  font-size: 16px;
  font-family: "Pretendard-600";
  color: white;
`;