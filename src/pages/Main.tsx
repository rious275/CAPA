import { useState, useEffect, cloneElement } from 'react'
import styled from 'styled-components';

import axios from 'axios';

import { theme } from '../styles/theme';
import Card from './component/Card'

interface Idata {
  id: any;
  title: string;
  client: string;
  due: string;
  count: number;
  amount: number;
  method: string;
  material: string;
  status: string;
}

const Main = () => {
    const [ dataList, setDataList ] = useState<Idata[]>([]);
    const [ filterDataList, setFilterDataList ] = useState<Idata[]>([]);
    const [ fixData, setFixData ] = useState<number>(0);
    const [ consulting, setConsulting ] = useState({
      status: false,
      knobSrc: "images/toggle_knob.svg",
      trackSrc: "images/toggle_track.svg",
      location: "-6px"
    });
    const [ menuValue, setMenuValue ] = useState({ status: false, value: "", xValue: "0" });

    // 업체별 견적 데이터 받아오기
    useEffect(() => {
      axios.get('http://localhost:4000/requests').then(res => setDataList(res.data));
    }, [])

    // 상담 중인 데이터 필터링
    useEffect(() => {
      const consultingList = filterDataList.filter((data: Idata) => data.status === "상담중");
      const notConsultingList = consultingList.filter((data: Idata) => data.status === "대기중");

      consulting.status ? setFilterDataList(consultingList) : setFilterDataList(notConsultingList);
    }, [consulting])

    // 필터링 배열 추가 후 중복값 제거
    useEffect(() => {
      const fix = filterDataList.filter(
        (data, i, finder) => i === finder.findIndex(t => t.id === data.id)
      );

      setFilterDataList(fix);
    }, [fixData])

    // 상담 토글 UI 변경
    const handleToggle = () => {
      consulting.status ? setConsulting({
        status: false,
        knobSrc: "images/toggle_knob.svg",
        trackSrc: "images/toggle_track.svg",
        location: "-6px"
      }) : setConsulting({
        status: true,
        knobSrc: "images/toggle_knob_sel.svg",
        trackSrc: "images/toggle_track_sel.svg",
        location: "16px" });
    }

    // 드롭다운 메뉴 열고 닫기
    const handleMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
      const input = e.target as HTMLElement;

      if (!menuValue.status && input.innerText === "가공방식") {
        setMenuValue({ status: true, value: "가공방식", xValue: "0" });
      } else if (!menuValue.status && input.innerText === "재료") {
        setMenuValue({ status: true, value: "재료", xValue: "105px" });
      } else if (menuValue.status) {
        setMenuValue({ ...menuValue, status: false });
      }
    }

    // 필터 기능은 정상구동 완료하지 못했습니다.
    // 가공방식 필터 함수
    const ckdProcessing: React.FormEventHandler = (e) => {
      const input = e.target as HTMLInputElement;
      const { checked, value } = input;

      const filtering = dataList.filter((data: Idata) => data.method.includes(value));

      if (checked) {
        filtering.filter((data: Idata) => filterDataList.indexOf(data.id) !== -1)
        setFilterDataList([...filterDataList, ...filtering]);
        setFixData(prev => prev + 1)
      }
      else if (!checked) {
        for (let i = 0; i < filterDataList.length; i++) {
          for (let j = 0; j < filtering.length; j++) {
            if (filterDataList[i].id === filtering[j].id) {
              filterDataList.splice(i, 1)
              setFilterDataList(filterDataList);
            }
          }
        }
      }
    }

    // 재료 필터 함수
    const ckdKinds: React.FormEventHandler<HTMLDivElement> = (e) => {
      const input = e.target as HTMLInputElement;
      const { checked, value } = input;

      const filtering = dataList.filter((data: Idata) => data.material.includes(value));

      if (checked) {
        filtering.filter((data: Idata) => filterDataList.indexOf(data.id) !== -1)
        setFilterDataList([...filterDataList, ...filtering]);
        setFixData(prev => prev + 1)
      } else if (!checked) {
        for (let i = 0; i < filterDataList.length; i++) {
          for (let j = 0; j < filtering.length; j++) {
            if (filterDataList[i].id === filtering[j].id) {
              filterDataList.splice(i, 1)
              setFilterDataList(filterDataList);
            }
          }
        }
      }
    }

    return (
        <MainWrap>
          <div>
            <div>
              <Title>들어온 요청</Title>
              <SubTitle>파트너님에게 딱 맞는 요청서를 찾아보세요.</SubTitle>
            </div>
            <Middle>
              <div>
                <FilterBox>
                  <DropdownMenuBox onClick={handleMenu}>
                    <div>가공방식</div>
                    <DropdownIcon alt="Dropdown Icon" src="images/arrow_drop_down_24px.svg" />
                  </DropdownMenuBox>
                  {menuValue.status && menuValue.value === "가공방식" &&
                    <Menus onChange={ckdProcessing} location={menuValue.xValue}>
                      <Menu>
                        <input type="checkbox" value="밀링" />
                        <MenuText>밀링</MenuText>
                      </Menu>
                      <Menu>
                        <input type="checkbox" value="선반" />
                        <MenuText>선반</MenuText>
                      </Menu>
                    </Menus>}

                  <DropdownMenuBox onClick={handleMenu}>
                    <div>재료</div>
                    <DropdownIcon alt="Dropdown Icon" src="images/arrow_drop_down_24px.svg" />
                  </DropdownMenuBox>
                  {menuValue.status && menuValue.value === "재료" &&
                    <Menus onChange={ckdKinds} location={menuValue.xValue}>
                      <Menu>
                        <input type="checkbox" value="알루미늄" />
                        <MenuText>알루미늄</MenuText>
                      </Menu>
                      <Menu>
                        <input type="checkbox" value="탄소강" />
                        <MenuText>탄소강</MenuText>
                      </Menu>
                      <Menu>
                        <input type="checkbox" value="구리" />
                        <MenuText>구리</MenuText>
                      </Menu>
                      <Menu>
                        <input type="checkbox" value="합금강" />
                        <MenuText>합금강</MenuText>
                      </Menu>
                      <Menu>
                        <input type="checkbox" value="강철" />
                        <MenuText>강철</MenuText>
                      </Menu>
                    </Menus>}
                </FilterBox>
              </div>
              <ToggelFilter>
                <ToggleBox onClick={handleToggle}>
                  <ToggleKnob alt="" src={consulting.knobSrc} location={consulting.location} />
                  <img alt="" src={consulting.trackSrc} />
                </ToggleBox>
                <div>상담 중인 요청만 보기</div>
              </ToggelFilter>
            </Middle>
            <CardList>
              {filterDataList.length ? filterDataList.map((data: Idata, idx) => (
                <Card key={idx} data={data} />
              )) : <NoContent><p>조건에 맞는 견적 요청이 없습니다.</p></NoContent>}
            </CardList>

          </div>
        </MainWrap>
    )
}

export default Main;

const MainWrap = styled.div`
  width: 80%;
  height: 100%;

  margin: 40px auto;

  @media only screen and (max-width: 960px) {
    margin: 40px auro;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
`;

const SubTitle = styled.div`
  line-height: 24px;
`;

const Middle = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 32px 0 24px;

  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const FilterBox =styled.div`
  position: relative;
  display: flex;
`;

const ToggelFilter = styled.div`
  display: flex;
  position: relative;

  font-size: 14px;
  font-weight: 500;

  @media only screen and (max-width: 960px) {
    margin: 24px 0 8px 4px;
  }
`;

const ToggleBox = styled.div`
  margin-right: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ToggleKnob = styled.img<{ location: string }>`
  position: absolute;
  top: -6px;
  left: ${props => props.location};
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin: 0 auto;

  @media only screen and (max-width: 960px) {
    justify-content: start;
  }
`;

const NoContent = styled.div`
  width: 100%;
  padding: 40px 0;

  border: 1px solid #c2c2c2;

  font-size: 14px;
  text-align: center;

  color: #939FA5;
`;

const Menus = styled.div<{ location: string }>`
  position: absolute;
  top: 40px;
  left: ${props => props.location};

  width: 130px;
  padding: 6px 12px;

  border: 1px solid ${theme.styleGray};
  border-radius: 4px;
  background-color: #fff;

  z-index: 1;
`;

const Menu = styled.div`
  display: flex;

  margin: 8px 0;
`;

const MenuText = styled.div`
  margin-left: 4px;

  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

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