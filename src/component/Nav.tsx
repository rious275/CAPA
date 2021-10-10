import styled from 'styled-components';

import { theme } from '../styles/theme';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom';

import MobileMenu from '../pages/component/MobileMenu';

const Nav = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);

  const modalOpen = () => {
    setIsModal(true);
    document.body.style.overflow = 'hidden';
  }

    return (
        <NavWrap>
          <MenuIcon src="images/menu.svg" alt="" onClick={modalOpen} />
          {isModal && <MobileMenu />}
          <Logo src='images/logo.png' alt="logo" />
          <Menus>
            <div>
              <img src="images/icon_company.svg" alt="icon_company" />
              <span>A 가공업체</span>
            </div>
              <Line />
              <span>로그아웃</span>
          </Menus>
        </NavWrap>
    )
}

export default Nav;

const NavWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 70px;
    padding: 0 40px;
    background-color: ${theme.mainColor};

    @media only screen and (max-width: 960px) {
      justify-content: start;
      height: 44px;
      margin-bottom: -16px;
      padding: 0 23px;
    }
`;

const MenuIcon = styled.img`
  &:hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 960px) {
    display: none;
  }
`;

const Logo = styled.img`
    width: 153px;

    @media only screen and (max-width: 960px) {
      width: 91.8px;
      margin-left: 19px;
    }
`;

const Menus = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  img {
    width: 16px;
    margin: 0 8px;
  }

  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const Line = styled.span`
    margin: 0 32px;
    border: 1px solid #FFFFFF;

    background-color: #fff;
`;