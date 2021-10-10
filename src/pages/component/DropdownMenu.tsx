import styled from 'styled-components';

import { theme } from '../../styles/theme';

interface MenuProps {
  text: string;
  openMenu: any;
}

const DropdownMenu = ( props: MenuProps ) => {
  return (
    <DropdownMenuBox onClick={props.openMenu}>
      <div>{props.text}</div>
      <DropdownIcon alt="Dropdown Icon" src="images/arrow_drop_down_24px.svg" />
    </DropdownMenuBox>
  )
}

export default DropdownMenu;

const DropdownMenuBox = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 98px;
  height: 32px;
  margin-right: 8px;

  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 30px;

  border: 1px solid ${props => props.theme.styledGray};
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    border: 1px solid ${theme.subColor};
  }
`;

const DropdownIcon = styled.img`
  width: 10px;
`;