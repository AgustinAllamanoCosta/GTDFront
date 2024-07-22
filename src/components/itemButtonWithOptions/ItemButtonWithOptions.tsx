import { styled } from 'styled-components';
import { memo, useState } from 'react';
import { Button } from '../button/Button';
import { ItemAddButton } from '../itemButton/ItemButton';
import { ItemAddButtonProps } from '../../types/types';

export const InputWithActions = memo(
  ({
    action,
    onMakeDaily,
    dataTest,
    disable = false,
    characterLimit,
  }: ItemAddButtonProps): React.JSX.Element => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const onChange = (event: any) => {
      const value: string = event.target.value;
      if (value.length <= characterLimit) {
        setValue(value);
      }
    };

    return (
      <div
        onMouseLeave={() => setShowOptions(false)}
        onClick={() => setShowOptions(!showOptions)}
      >
        <ItemAddButton
          action={() => {
            action(value);
            setValue('');
            setShowOptions(false);
          }}
          onChange={onChange}
          value={value}
          characterLimit={characterLimit}
          dataTest={dataTest}
          disable={disable}
          showCharacterLimit={showOptions}
        />

        {showOptions && (
          <ButtonContainer>
            <Button
              key={`accept-button`}
              text={'accept'}
              onClick={() => {
                action(value);
                setValue('');
              }}
            />
            {onMakeDaily && (
              <Button
                key={`make-daily-button`}
                text={'make daily'}
                onClick={() => {
                  onMakeDaily(value);
                  setValue('');
                }}
              />
            )}
          </ButtonContainer>
        )}
      </div>
    );
  },
);

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-evenly;
  padding-left: 9px;
`;
