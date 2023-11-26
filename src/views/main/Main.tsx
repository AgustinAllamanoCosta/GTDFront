import styled from 'styled-components';
import { Card } from '../../components/card/Card';
import { UserCard } from '../../components/userCard/UserCard';
import { useState } from 'react';

type UserData = {
  name: string;
  photoURL: string;
};

type MainViewProps = {
  userData?: UserData;
};

const MainView = ({
  userData = {
    name: 'Agustin Allamano Costa',
    photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
  },
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);

  return (
    <Container>
      <UserCard
        userName={userConfig.name}
        userPhoto={userConfig.photoURL}
      />

      <Card></Card>

      <Card></Card>

      <Card></Card>
    </Container>
  );
};

const Container = styled.div``;

export default MainView;
