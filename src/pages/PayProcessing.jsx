import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import MemberCell from '../entities/PayProcessing/ui/MemberCell';
import Loading from '../shared/Loading/Loading';
import { useRecoilValue } from 'recoil';
import { membersState } from '../shared/state/recoil';

export default function PayProcessing() {
  const members = useRecoilValue(membersState)
  
  const navigate = useNavigate();
  let arrMembers = members.map(member => member.name);

  useEffect(() => {
    const totalTime = members.reduce((acc, _, index) => {
      // 누적된 시간 + 랜덤 추가 시간
      const delay = acc + Math.random() * 500 + 300; // 최소 300ms, 최대 800ms
      return delay;
    }, 1000); // 초기 1000ms 대기

    const timer = setTimeout(() => {
      navigate('/pay-completed');
    }, totalTime);

    return () => clearTimeout(timer);
  }, [navigate, members]);

  // 누적 딜레이 계산
  const delays = members.reduce((acc, _, index) => {
    const lastDelay = acc[index - 1] || 700; // 첫 번째는 초기 딜레이 1000ms
    const nextDelay = lastDelay + Math.random() * 500 + 100; // 최소 300ms, 최대 800ms
    acc.push(nextDelay);
    return acc;
  }, []);

  return (
    <MainLayout>
      <MainWrap>
        <MainTitle>지금<br />결제 중이에요.</MainTitle>
        <Loading />
      </MainWrap>

      <Price>총 금액: 120,000원</Price>

      <ListContainer>
        {arrMembers.map((member, index) => (
          <AnimatedMember
            key={index}
            name={member}
            price="20,000원"
            delay={delays[index]}
          />
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
    delay,
  });

  return (
    <AnimatedMemberCell style={animationProps}>
      <MemberCell name={name} price={price} />
    </AnimatedMemberCell>
  );
}

const MainLayout = styled.div`
  padding: 0 20px;
`;

const MainWrap = styled.div`
display: flex;
align-items: baseline;
padding: 0 20px;
`

const MainTitle = styled.div`
  width: 700px;
  color: #212330;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 36px;
  font-style: normal;
  line-height: 44px; /* 122.222% */
  letter-spacing: -0.9px;
  margin-top: 110px;
  margin-bottom: 24px;
  word-wrap: break-word; /* 줄 바꿈 허용 */
  word-break: break-word; /* 긴 단어도 줄 바꿈 */
`;

const LoadingWrap = styled.div`
padding: 20px
`

const Price = styled.div`
  font-size: 20px;
  font-family: "Pretendard";
  font-weight: 500;
  margin-bottom: 32px;
  padding: 0 20px;
`;

const ListContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const AnimatedMemberCell = styled(animated.div)`
  width: 100%;
  margin-bottom: 5px;
`;