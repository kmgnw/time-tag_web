import React, { useState } from 'react';
import styled from 'styled-components';
import QR_blur from '../../../assets/QR_blur.png'
import QR from '../../../assets/QR.png'
import lock from '../../../assets/lock_green.svg'
import { useNavigate } from 'react-router-dom';

export default function QRCode() {
    const navigate = useNavigate()

    const [isLock, setIsLock] = useState(true);
    let longPressTimer = null;

    const qrClickHandler = () => {
        if(isLock){
            setIsLock(!isLock);
        }else{
            navigate('/pay-processing');
        }
        
    };

    // const qrLongPressHandler = () => {
    //     if (!isLock) {
            
    //     } else {
    //         alert("잠금을 해제해 주세요.");
    //     }
    // };

    // const handleMouseDown = () => {
    //     longPressTimer = setTimeout(() => {
    //         qrLongPressHandler();
    //     }, 800); 
    // };

    // const handleMouseUp = () => {
    //     clearTimeout(longPressTimer);
    // };
    
    return (
        <QRWrap
            onClick={qrClickHandler}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
            isLock={isLock}
        >
            <QRBackground
                style={{ backgroundImage: `url(${isLock ? QR_blur : QR})` }}
                isLock={isLock}
            >
                {isLock && (
                    <QRLockWrap>
                        <LockImg src={lock} alt="lock icon" />
                        <UnlockText>결제하기</UnlockText>
                    </QRLockWrap>
                )}
                
            </QRBackground>
            {!isLock && 
            <InfoText>가상 결제를 진행하기 위해 <br />QR 코드를 눌러주세요.</InfoText>
            }
        </QRWrap>
    );
}

const QRWrap = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => (props.isLock ? '0' : '20px')};
  cursor: pointer;
  position: relative;
`;

const QRBackground = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${(props) => (props.isLock ? '190px' : '170px')};
  height: ${(props) => (props.isLock ? '190px' : '170px')};
  position: relative;
  top: ${(props) => (props.isLock ? '0px' : '11px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRLockWrap = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #FFF;
  background-color: rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(4px);
`;

const LockImg = styled.img`
  margin-bottom: 4px;
`;

const UnlockText = styled.span`
  color: #303030;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.35px;
`;

const InfoText = styled.div`
font-size: 12px;
margin-top: 12px;
font-weight: 350;
position: absolute;
top: 190px;
line-height: 1.5;
`