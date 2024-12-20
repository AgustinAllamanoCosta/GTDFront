import { styled } from 'styled-components';
import { memo, useEffect, useState } from 'react';
import { CarouselProps } from '../../types/types';

export const Carousel = memo(
  ({ children }: CarouselProps): React.JSX.Element => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lasIndex, setLastIndex] = useState(children.length - 1);
    const [touchPosition, setTouchPosition] = useState<number>(0);
    const [elementWidth, setElementWidth] = useState<number>(380);

    const next = () => {
      if (currentIndex < lasIndex)
        setCurrentIndex((prevState) => prevState + 1);
    };

    const prev = () => {
      if (currentIndex > 0) setCurrentIndex((prevState) => prevState - 1);
    };

    const handleTouchStart = (e: any) => {
      setTouchPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e: any) => {
      const touchDown = touchPosition;

      if (touchDown === 0) return;

      const diffX = touchDown - e.touches[0].clientX;

      if (diffX > 10) {
        next();
        setTouchPosition(0);
        return;
      } else if (diffX < -10) {
        prev();
        setTouchPosition(0);
        return;
      }
    };

    useEffect(() => {
      setLastIndex(children.length - 1);
      if (children) {
        const divElement = document.getElementById(`item-${currentIndex}`);
        if (divElement)
          setElementWidth(divElement.getBoundingClientRect().width);
      }
    }, [children, currentIndex]);

    return (
      <CarouselContainer>
        <CarouselWrapper>
          <CarouselContentWrapper
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <CarouselContent
              current_index={currentIndex}
              current_width={elementWidth}
            >
              {children}
            </CarouselContent>
          </CarouselContentWrapper>
        </CarouselWrapper>
      </CarouselContainer>
    );
  },
);

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50vh;
  max-width: 380px;
  overflow: hidden;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
`;

const CarouselWrapper = styled.div`
  display: flex;
  position: relative;
`;

const CarouselContentWrapper = styled.div`
  overflow: hidden;
`;

const CarouselContent = styled.div<{
  current_index: number;
  current_width: number;
}>`
  display: flex;
  @media screen and (max-width: 800px) and (min-width: 100px) {
    transform: translateX(
      -${(props) => props.current_index * props.current_width}px
    );
  }
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
