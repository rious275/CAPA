import styled from 'styled-components';

import { theme } from '../../styles/theme';

interface BtnProps {
  text: string;
}

const StyledBtn = (props: BtnProps) => {
  return (
    <>
      {props.text === "요청 내역 보기" ? (
        <RequesttBtn>{props.text}</RequesttBtn>
      ) : <ChatBtn>{props.text}</ChatBtn>}
    </>
  )
}

export default StyledBtn;

const RequesttBtn = styled.button`
  margin-right: 8px;
  padding: 8px 14px;

  border-style: none;
  border-radius: 4px;
  
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${theme.subColor};

  &:hover {
    cursor: pointer;
  }
`;

const ChatBtn = styled.button`
  margin-right: 8px;
  padding: 8px 14px;

  border: 1px solid ${theme.subColor};
  border-radius: 4px;

  font-size: 14px;
  font-weight: 500;
  color: ${theme.subColor};
  background-color: #fff;

  &:hover {
    cursor: pointer;
  }
`;