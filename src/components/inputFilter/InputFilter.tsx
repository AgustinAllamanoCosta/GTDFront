import { memo } from 'react';
import { styled } from 'styled-components';
import { THEME_ONE } from '../../constants/colors';
import { FONTS } from '../../constants/size';
import { InputFilterProps } from '../../types/types';

export const InputFilter = memo(
  ({ onKeyDown }: InputFilterProps): React.JSX.Element => {
    return (
      <Input
        data-cy={`input-filter`}
        placeholder="Start typing to search"
        onChange={(e) => {
          onKeyDown(e.target.value);
        }}
      />
    );
  },
);

const Input = styled.input`
  font-size: ${FONTS.TEXT};
  color: ${THEME_ONE.fontColor};
  border: 0;
  display: inline-flex;
  width: auto;
  background-color: ${THEME_ONE.cardBackGround};
  flex-direction: row;
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: bold;
`;
