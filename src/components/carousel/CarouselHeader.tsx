import React, { FC } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { ExpandIcon, HeaderLeft } from './HeaderLeft';
import { Row } from '../layout/Row';
import { HeaderButton } from './HeaderButton';
interface IProps {
  expanded: boolean;
  title: string;
  onExpand?: () => void;
  onNext?: () => void;
  onBack?: () => void;
}

export const CarouselHeader: FC<IProps> = props => {
  const { expanded, onExpand, onNext, onBack, title } = props;
  return (
    <Row justify="space-between">
      <HeaderLeft onClick={onExpand}>
        {onExpand && <ExpandIcon expanded={expanded} />}
        <h4>{title}</h4>
      </HeaderLeft>

      <Row>
        <HeaderButton onClick={onBack}>
          <IoIosArrowBack />
        </HeaderButton>
        <HeaderButton onClick={onNext}>
          <IoIosArrowForward />
        </HeaderButton>
      </Row>
    </Row>
  );
};
