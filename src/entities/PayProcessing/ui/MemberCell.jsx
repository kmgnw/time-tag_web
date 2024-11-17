import React from 'react';
import styled from 'styled-components';
import profile from '../../../assets/profile_green.svg'

export default function MemberCell({ name, price }) {
    return (
        <MainLayout>
            <ProfileWrap>
                <ProfileImg src={profile} alt="profile" />
                <Name>{name}</Name>
            </ProfileWrap>
            
            <Price>{price}</Price>
        </MainLayout>
    );
}

const MainLayout = styled.div`
//   padding: 0px 20px; 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: relative;
  top: -3px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #212330;
`;