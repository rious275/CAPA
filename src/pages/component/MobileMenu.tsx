import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';

import { modalState } from '../../atom';

const MobileMenu = () => {
  const setIsModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <ModalContainer>
      <Wrapper onClick={closeModal} />
      <Section>
        <Header>
          <MobileMenuLogo src='images/logo_sub.png' alt="logo" />
        </Header>
        <Main>
          <div>
            <img src="images/icon_company.svg" alt="icon_company" />
            <span>파트너정밀가공</span>
          </div>
          <div>로그아웃</div>
        </Main>
      </Section>
    </ModalContainer>
  );
};

export default MobileMenu;

const ModalContainer = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 16px 20px;

  border: 1px solid #E5E5E5;
`;

const MobileMenuLogo = styled.img`
  width: 92px;
`;

const Section = styled.div`
  position: absolute;
  left: 0;

  width: 280px;
  height: 100vh;

  background-color: #fff;
  // overflow: hidden;

  z-index: 9999;
`;

const Main = styled.div`
  padding: 14px 32px;
  
  div {
    margin: 24px 0;
    font-size: 14px;
    font-weight: 500;
  }

  img {
    filter: invert(100%);
  }

  span {
    margin-left: 8px;
  }
`;
