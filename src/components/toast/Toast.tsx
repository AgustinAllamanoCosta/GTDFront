import { memo } from 'react';
import { styled } from 'styled-components';
import { THEME_ONE } from '../../constants/colors';
import { FONTS, SIZE } from '../../constants/size';
import { ToastProp } from '../../types/types';
import { Button } from '../button/Button';

export const Toast = memo(
  ({ children, onClose }: ToastProp): React.JSX.Element => {
    return (
      <TagContainer>
        <TagContent data-cy="Toast">{children}</TagContent>
        <Button
          onClick={onClose}
          text="X"
        />
      </TagContainer>
    );
  },
);

const TagContainer = styled.div`
  background-color: ${THEME_ONE.stickBackGround};
  border-radius: 10px;
  max-width: ${SIZE.M};
  min-width: 320px;
  max-height: 40px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

const TagContent = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  font: ${FONTS.TEXT};
`;
