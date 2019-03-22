import React, { ReactNode, FC } from 'react';
import { CardMedia } from './CardMedia';
import { Image } from '../styled/Image';
import { PlayIcon, PauseIcon, VolumeIcon } from '../IconButtons';
import { Overlay } from '../styled/OverLay';
import { CardContent } from './CardContent';
import { Title } from './Title';
import { MdMusicNote } from 'react-icons/md';
import { Placeholder } from '../styled/Placeholder';

interface IProps {
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onImageLoad: () => any;
  showPlay?: boolean;
  showVolume?: boolean;
  showPause?: boolean;
  backdrop?: boolean;
  hovered?: boolean;
  imageSource: string;
  loaded?: boolean;
  title?: ReactNode;
  cardRef?: React.RefObject<HTMLDivElement>;
}

// TODO: Pause Icon should only be visible when the radio is active AND the Icon Button is hovered.
export const View: FC<IProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  showPause,
  showPlay,
  hovered,
  imageSource,
  showVolume,
  title,
  loaded,
  onImageLoad,
  cardRef,
  ...rest
}) => (
  <div ref={cardRef} style={{ width: '10rem' }}>
    <CardMedia
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...rest}
      // shadowColor="rgba(161, 243, 28, 0.1)"
    >
      <Placeholder shouldFadeOut={loaded} gradient={true}>
        <Image blur={hovered} src={imageSource} onLoad={onImageLoad} loaded={loaded} />
      </Placeholder>
      {showPlay && <PlayIcon border={true} position="absolute" type="light" />}
      {showPause && <PauseIcon border={true} position="absolute" type="light" />}
      {showVolume && <VolumeIcon position="absolute" type="dark" />}
      <Overlay show={!!hovered} type="light" />
    </CardMedia>
    {title && (
      <CardContent alignItems="flex-start">
        <Title>{title}</Title>
      </CardContent>
    )}
  </div>
);
