import React from 'react';
import styled from 'styled-components';
import ex_profile from '../../../assets/profile.png'

export default function Members({ members, blurViewClickedHandler }) {
    return (
        <MainLayout onClick={blurViewClickedHandler}>
            <ProfileContainer>
                <ProfileWrap>
                    {members.slice(0, 5).map((e, i) => (
                        <Profile key={i} src={ex_profile} index={i} alt="profile" />
                    ))}
                </ProfileWrap>

                {members.length > 5 && (
                    <MoreCount>+{members.length - 5}</MoreCount>
                )}
            </ProfileContainer>
        </MainLayout>
    );
}

const MainLayout = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: row;
`;

const ProfileWrap = styled.div`
  display: flex;
  background-color: #FFF;
  border: 1px solid #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
`;

const Profile = styled.img`
  margin-left: ${(props) => (props.index === 0 ? '0px' : '-25px')};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const MoreCount = styled.span`
  color: #3A4276;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.5px;
  position: absolute;
  right: -25px;
  top: 10px;
`;