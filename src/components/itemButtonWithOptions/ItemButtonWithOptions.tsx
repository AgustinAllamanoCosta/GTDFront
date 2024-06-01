import { styled } from 'styled-components';
import { memo, useState } from 'react';
import { Button } from '../button/Button';
import { ItemAddButton } from '../itemButton/ItemButton';

type ItemAddButtonProps = {
  action: () => void;
  onChange: (event: any) => void;
  onMakeDaily?: () => void;
  value: string;
  dataTest?: string;
  disable?: boolean;
  characterLimit?: number;
};

export const ItemAddButtonWithOptions = memo(
  ({
    onChange,
    action,
    onMakeDaily,
    value,
    dataTest,
    disable = false,
    characterLimit,
  }: ItemAddButtonProps): React.JSX.Element => {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div
        onFocus={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <ItemAddButton
          action={() => {
            action();
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
              text={'accept'}
              onClick={() => {
                action();
                setShowOptions(false);
              }}
            />
            {onMakeDaily && (
              <Button
                text={'make daily'}
                onClick={() => {
                  onMakeDaily();
                  setShowOptions(false);
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
