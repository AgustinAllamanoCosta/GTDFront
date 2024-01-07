import { styled } from 'styled-components';
import { Card } from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { FONTS } from '../../constants /size';
import { useNavigate } from 'react-router-dom';

const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <Card content_center={true}>
      <Title>Something went wrong!</Title>
      <Button
        text="OK"
        onClick={() => {
          navigate('/');
        }}
      />
    </Card>
  );
};

const Title = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TITLE};
  margin-bottom: 30px;
`;

export default ErrorView;
