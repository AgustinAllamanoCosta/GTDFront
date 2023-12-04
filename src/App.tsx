import styled from 'styled-components';
import MainView from './views/main/Main';

function App() {
  return (
    <MainContainer>
      <MainView />
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: #d9d9d9;
`;
