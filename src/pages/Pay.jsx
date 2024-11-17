import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Selector from '../entities/Pay/ui/Selector';
import ToolBar from '../entities/Pay/ui/ToolBar';
import QRCode from '../entities/Pay/ui/QRCode';
import MemberInfo from '../entities/Pay/ui/MemberInfo';
import Members from '../entities/Pay/ui/Members';
import profile from '../assets/profile_green.svg';

export default function Pay() {

    const [isBtnClicked, setIsBtnClicked] = useState(true);

    function blurViewClickedHandler() {
        setIsBtnClicked(!isBtnClicked);
    }

    const members = ['권*남', '권*남', '권*남', '권*남', '권*남', '권*남', '권*남', '권*남'];

    useEffect(() => {
        setIsBtnClicked(false);
    }, []);

    return (
        <MainLayout>

            <ContentWrapper isBlurred={isBtnClicked}>
                <ToolBar title="Pay" />
                <Selector />
                <QRCode />
                <MemberInfo count={members.length} />
                <Members members={members} blurViewClickedHandler={blurViewClickedHandler} />
            </ContentWrapper>

            {isBtnClicked && (
                <BlurViewOverlay onClick={blurViewClickedHandler}>
                    <StyledBlurView>
                        <MainTitle>총 정산 인원</MainTitle>
                        <SubTitle>{members.length}명</SubTitle>
                        {members.map((e, i) => (
                            <ProfileWrap key={i}>
                                <ProfileImage src={profile} alt="profile" />
                                <BlurText>{e}</BlurText>
                            </ProfileWrap>
                        ))}
                    </StyledBlurView>
                </BlurViewOverlay>
            )}
        </MainLayout>
    );
}

const MainLayout = styled.div`
    background-color: white;
    align-items: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: ${({ isBlurred }) => (isBlurred ? 'blur(8px)' : 'none')};
    transition: filter 0.3s ease;
`;

const BlurViewOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
`;

const StyledBlurView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const MainTitle = styled.div`
    font-size: 20px;
    font-family: "Pretendard-Bold";
    margin-bottom: 0px;
`;

const SubTitle = styled.div`
    font-size: 56px;
    font-family: "Pretendard-Regular";
    margin-bottom: 50px;
`;

const ProfileWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    position: relative;
    left: -8px;
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const BlurText = styled.span`
    color: black;
    font-size: 28px;
    font-weight: 400;
    font-family: "Pretendard-400";
    position: relative;
    top: -2px;
`;