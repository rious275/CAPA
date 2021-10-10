import ReactDOM from 'react-dom';

import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <Routes />
    <GlobalStyle />
  </RecoilRoot>,
  document.getElementById('root')
);