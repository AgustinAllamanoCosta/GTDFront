import { styled } from 'styled-components';
import { memo, useEffect, useState } from 'react';

export type CarouselProps = {
  children: React.JSX.Element[];
};

export const Carousel = memo(
  ({ children }: CarouselProps): React.JSX.Element => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);
    const [touchPosition, setTouchPosition] = useState(null);

    const next = () => {
      if (currentIndex < length - 1)
        setCurrentIndex((prevState) => prevState + 1);
      else setCurrentIndex(0);
    };

    const prev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevState) => prevState - 1);
      }
    };

    const handleTouchStart = (e: any) => {
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: any) => {
      const touchDown = touchPosition;

      if (touchDown === null) {
        return;
      }

      const currentTouch = e.touches[0].clientX;
      const diff = touchDown - currentTouch;

      if (diff > 5) {
        next();
      }

      if (diff < -5) {
        prev();
      }

      setTouchPosition(null);
    };

    useEffect(() => {
      setLength(children.length);
    }, [children]);

    return (
      <CarouselContainer>
        <CarouselWrapper>
          <CarouselContentWrapper
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <CarouselContent current_index={currentIndex}>
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
`;

const CarouselWrapper = styled.div`
  display: flex;
  position: relative;
`;

const CarouselContentWrapper = styled.div`
  overflow: hidden;
`;

const CarouselContent = styled.div<{ current_index: number }>`
  display: flex;
  transform: translateX(-${(props) => props.current_index * 50}vh);
  @media screen and (min-width: 380px) {
    transform: translateX(-${(props) => props.current_index * 380}px);
  }
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
