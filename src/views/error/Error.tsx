import { styled } from 'styled-components';
import { Card } from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { FONTS } from '../../constants /size';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useContext, useEffect } from 'react';

type ErrorViewProps = {
  onClick: (e: any) => void;
  message?: string | undefined;
};

const ErrorView = ({ onClick, message }: ErrorViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);

  useEffect(() => {
    if (message) {
      errorContext.setMessage(message);
    }
  }, [errorContext.anErrorHappend]);

  return (
    <Card content_center={true}>
      <Title data-cy="Error-view-title">Something went wrong!</Title>
      <ErrorMessage data-cy="Error-view-message">
        {errorContext.errorMessage}
      </ErrorMessage>
      <Button
        text="OK"
        onClick={onClick}
      />
    </Card>
  );
};

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
