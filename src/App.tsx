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
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 884px;
`;
