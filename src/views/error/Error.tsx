import { styled } from 'styled-components';
import { Card } from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { FONTS } from '../../constants/size';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useContext, useEffect } from 'react';

type ErrorViewProps = {
  onClick: (e: any) => void;
  message?: string;
};

const ErrorView = ({ onClick, message }: ErrorViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);

  useEffect(() => {
    if (message) {
      errorContext.setError({ message });
    }
  }, [errorContext.anErrorHappend]);

  return (
    <Container>
      <ErrorCardContainer>
        <Card content_center={true}>
          <Title data-cy="Error-view-title">Something went wrong!</Title>
          <ErrorMessage data-cy="Error-view-message">
            {errorContext?.error?.message}
          </ErrorMessage>
          <Button
            text="OK"
            onClick={onClick}
          />
        </Card>
      </ErrorCardContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const ErrorCardContainer = styled.div`
  width: 43vh;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TEXT};
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${FONTS.TITLE};
  margin-bottom: 30px;
`;

export default ErrorView;
