import styled from 'styled-components';

import { theme } from '../../styles/theme';
import StyledBtn from './StyledBtn';

const Card = (props: any) => {
  const { title, client, due, count, amount, method, material, status } = props.data;
  
  return (
    <CardWrap>
      <div>
        {status === "상담중" && <Consulting>상담중</Consulting>}
        <Title>{title}</Title>
        <Client>{client}</Client>
        <Due>{due}까지 납기</Due>
      </div>
      <Hr />
      <div>
        <Progress>
          <div>도면개수</div> 
          <ProgressVal>{count}</ProgressVal>
        </Progress>
        <Progress>
          <div>총 수량</div>
          <ProgressVal>{amount}개</ProgressVal>
        </Progress>
        <Progress>
          <div>가공방식</div>
          <ProgressVal>{method}</ProgressVal>
        </Progress>
        <Progress>
          <div>재료</div>
          <ProgressVal>{material}</ProgressVal>
        </Progress>
      </div>
      <BtnBox>
        <StyledBtn text="요청 내역 보기" />
        <StyledBtn text="채팅하기" />
      </BtnBox>
    </CardWrap>
  )
}

export default Card;

const CardWrap = styled.div`
  position: relative;

  width: 366px;
  height: 356px;

  margin: 8px;
  padding: 30px 18px 30px;

  color: #323D45;
  border: 1px solid #E5E5E5;
  border-radius: 4px;

  &:hover {
    outline: 2px solid ${theme.subColor};
    outline-offset: -1px;
  }

  @media only screen and (max-width: 960px) {
    width: 320px;
    height: 344px;
  }
`;

const Consulting = styled.div`
  position: absolute;
  top: 25px;
  right: 18px;
  
  padding: 6px 8px;

  border: 1px solid #FFA000;
  border-radius: 14px;

  font-size: 12px;
  font-weight: 500;
  color: #FFA000;
`;

const Title = styled.div`
  font-weight: 700;
`;

const Client = styled.div`
  margin-top: 8px;

  font-size: 14px;
  font-weight: 500;
`;

const Due = styled.div`
  margin-top: 28px;

  font-size: 14px;
  color: ${props => props.theme.subFontColor};
`;

const Hr = styled.hr`
  margin: 20px 0;

  border-style: none;
  border-bottom: 1px solid #e5e5e5;
`;

const Progress = styled.div`
  display: flex;

  font-size: 14px;

  div {
    width: 100px;
    margin-top: 14px;
  }
`;

const ProgressVal = styled.div`
  font-weight: 700;
`;

const BtnBox = styled.div`
  margin-top: 32px;
`;