import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Selector from '../entities/Pay/ui/Selector';
import ToolBar from '../entities/Pay/ui/ToolBar';
import QRCode from '../entities/Pay/ui/QRCode';
import MemberInfo from '../entities/Pay/ui/MemberInfo';
import Members from '../entities/Pay/ui/Members';
import profile from '../assets/profile_green.svg';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useRecoilState } from 'recoil';
import { membersState, roomIdState } from '../shared/state/recoil';
import { useNavigate } from 'react-router-dom';

export default function Pay() {
    const [isBtnClicked, setIsBtnClicked] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");
    const [roomId, setRoomId] = useRecoilState(roomIdState); // URL에서 가져온 roomId 상태
    const stompClient = useRef(null); // stompClient를 useRef로 관리
    const subscriptions = useRef(new Map()); // 구독 관리 (초기값: 빈 Map)
    const navigate = useNavigate()

    const [members, setMembers] = useRecoilState(membersState)

    // URL에서 roomId 가져오기
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const roomIdFromURL = urlParams.get('roomId');
        if (roomIdFromURL) {
            setRoomId(roomIdFromURL);
        }
    }, []);

    // WebSocket 연결
    useEffect(() => {
        setIsBtnClicked(false);

        function connect() {
            const socket = new SockJS('https://52.78.8.93.nip.io/ws'); // WebSocket 엔드포인트
            const client = Stomp.over(socket); // Stomp 클라이언트 생성

            client.connect(
                {},
                (frame) => {
                    console.log('Connected:', frame);
                    setConnectionStatus("Connected");
                    stompClient.current = client;

                    // 자동으로 방에 참여
                    if (roomId) {
                        joinRoom(roomId);
                    }
                },
                (error) => {
                    console.error('Connection error:', error);
                    setConnectionStatus("Disconnected");
                }
            );
        }

        connect();

        // 컴포넌트 언마운트 시 WebSocket 연결 해제
        return () => {
            if (stompClient.current) stompClient.current.disconnect();
        };
    }, [roomId]);

    // 방 참여 로직
    const joinRoom = (roomId) => {
        if (stompClient.current) {
            const joinRoomRequest = { tableNum: roomId };

            const topicPath = `/topic/${roomId}`;
            const queuePath = '/user/queue/reply';

            // 토픽 구독
            const topicSub = stompClient.current.subscribe(topicPath, (message) => {
                const data = JSON.parse(message.body);
                console.log("Message received on topic:", data);
                if (data.type == "join") {
                    // if (!isNameDisplayed) {
                    //     setUserData(data.result); // 처음 받은 이름을 표시
                    //     isNameDisplayed = true; // 한 번만 실행되도록 설정
                    //     curRoomId = roomId
                    // }
                    console.log(members)
                    setMembers((prev) => [...prev, data.result]);
                    console.log(members)

                }
                else if (data.type == "quit") {
                    // deleteMember(data.result);
                    // showGroupInfo(memberData);
                    // checkQuit(data.result);
                }
                else if (data.type == "dutch") {
                    unsubscribeAll();
                    navigate('pay-processing')
                    // unsubscribeAll();
                    // resetData();            
                    // resetDiv();
                }

                else {
                    console.error("알 수 없는 타입");
                }

                if (data.result) {
                    setMembers((prev) => [...prev, ...data.result]);
                }
            });
            subscriptions.current.set(topicPath, topicSub);

            // 개인 큐 구독
            const queueSub = stompClient.current.subscribe(queuePath, (message) => {
                const data = JSON.parse(message.body);
                console.log("Message received on queue:", data);

                initMemberData(data);
            });
            subscriptions.current.set(queuePath, queueSub);

            stompClient.current.send('/app/join', {}, JSON.stringify(joinRoomRequest));
            console.log(`Joined room: ${roomId}`);
        }
    };

    // 멤버 데이터 초기화
    const initMemberData = (data) => {
        setMembers(data.dutchMembers || []);
        console.log("됨")
    };

    // Blur View 핸들러
    function blurViewClickedHandler() {
        setIsBtnClicked(!isBtnClicked);
    }

    // 모든 구독 취소 함수
    const unsubscribeAll = () => {
        subscriptions.current.forEach((subscription, path) => {
            subscription.unsubscribe(); // 구독 취소
            console.log(`Unsubscribed from ${path}`);
        });
        subscriptions.current.clear(); // Map 초기화
    };

    // 더치페이 처리
    const dutch = () => {
        if (stompClient.current) {
            const dutchRoomRequest = {
                tableNum: roomId, // 현재 roomId 사용
            };

            stompClient.current.send("/app/dutch", {}, JSON.stringify(dutchRoomRequest));
            console.log("Dutch request sent");
        }
    };

    return (
        <MainLayout>
            <ContentWrapper isBlurred={isBtnClicked}>
                <ToolBar title="Pay" />
                <Selector />
                <QRCode dutch={dutch} />
                <MemberInfo count={members.length} />
                <Members members={members} blurViewClickedHandler={blurViewClickedHandler} />
            </ContentWrapper>

            {isBtnClicked && (
                <BlurViewOverlay onClick={blurViewClickedHandler}>
                    <StyledBlurView>
                        <MainTitle>총 정산 인원</MainTitle>
                        <SubTitle>{members.length}명</SubTitle>
                        {members.map((e, i) => (
                            <BlurText key={i}>{e.name}</BlurText> // 객체의 name 속성을 렌더링
                        ))}
                        {/* {members.map((e, i) => (
                            <ProfileWrap key={i}>
                                <ProfileImage src={profile} alt="profile" />
                                <BlurText>{e}</BlurText>
                            </ProfileWrap>
                        ))} */}
                    </StyledBlurView>
                </BlurViewOverlay>
            )}
        </MainLayout>
    );
}

// Styled Components
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
    margin-bottom: 15px;
`;