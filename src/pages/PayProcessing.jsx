import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import MemberCell from '../entities/PayProcessing/ui/MemberCell';

export default function PayProcessing() {
  const members = ['권*남', '김*수', '박*영', '이*민', '최*준', '장*희', '정*아', '오*석'];
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the next page after all members are displayed
    const timer = setTimeout(() => {
      navigate('/pay-completed');
    }, 350 * members.length + 1000); // Wait for all animations to complete plus a delay

    return () => clearTimeout(timer);
  }, [navigate, members]);

  return (
    <MainLayout>
      <MainTitle>곧 정산이<br />완료될 거에요.</MainTitle>
      <Price>총 금액: 100,000원</Price>

      <ListContainer>
        {members.map((member, index) => (
          <AnimatedMember key={index} name={member} price="20,000원" delay={index * 350} />
        ))}
      </ListContainer>
    </MainLayout>
  );
}

function AnimatedMember({ name, price, delay }) {
  const animationProps = useSpring({
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 },
    config: config.default,
    delay, // Set delay for each member
  });

  return (
    <AnimatedMemberCell style={animationProps}>
      <MemberCell name={name} price={price} />
    </AnimatedMemberCell>
  );
}

const MainLayout = styled.div`
  padding: 0px 20px;
`;

const MainTitle = styled.div`
  color: #212330;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 44px; /* 122.222% */
  letter-spacing: -0.9px;
  margin-top: 110px;
  margin-bottom: 24px;
`;

const Price = styled.p`
  font-size: 20px;
  font-family: "Pretendard-400";
  margin-bottom: 32px;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const AnimatedMemberCell = styled(animated.div)`
  width: 100%;
  margin-bottom: 10px;
`;