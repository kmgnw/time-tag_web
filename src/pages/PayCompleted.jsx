import React from 'react';
import styled from 'styled-components';
import MemberCell from '../entities/PayProcessing/ui/MemberCell';
import { useNavigate } from 'react-router-dom';
import Checking from '../shared/Checking/Checking';
import { membersState } from '../shared/state/recoil';
import { useRecoilValue } from 'recoil';

export default function PayCompleted() {
  const members = useRecoilValue(membersState);

    const arrMembers = members.map(member => member.name);
    const navigate = useNavigate();

    function btnClickHandler() {
        navigate('/');
    }

    return (
        <MainLayout>
            <MainWrap>
                <MainTitle>결제가<br />완료되었어요.</MainTitle>
                <Checking />
            </MainWrap>

            <Price>총 금액: 120,000원</Price>

            {arrMembers.map((member, index) => (
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

const MainWrap = styled.div`
    display: flex;
    margin-bottom: 24px;
`

const MainTitle = styled.div`
    margin-top: 110px;
    // margin-bottom: 24px;
    color: #212330;
    font-family: "Pretendard-Bold";
    font-size: 36px;
    font-style: normal;
    line-height: 44px; /* 122.222% */
    letter-spacing: -0.9px;
`;

const Price = styled.div`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  margin-bottom: 32px;
  margin-top: -3px;
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
  background-color: #18CD73;
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
  font-family: "Pretendard-Regular";
  color: white;
`;