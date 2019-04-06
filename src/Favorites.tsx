import React, { FC } from 'react';
import { isLarge } from './styles';
import { Carousel } from './components/carousel';
import { Backdrop } from './components/backdrop';
import { IRadio } from './data';
import { MdFavorite } from 'react-icons/md';
import { FAB } from './components/icon-buttons/FAB';

interface IProps {
  favorites: IRadio[];
  favoritesOpened: boolean;
  isPlaying: boolean;
  selectedRadioId?: number;
  expandFavorites: () => void;
  openFavorites: () => void;
  togglePlayRadio: (id: number) => (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export const Favorites: FC<IProps> = props => {
  const {
    favorites,
    favoritesOpened,
    isPlaying,
    selectedRadioId,
    expandFavorites,
    togglePlayRadio,
    openFavorites,
  } = props;

  if (isLarge())
    return (
      <Carousel
        data={favorites}
        handleExpand={expandFavorites}
        expanded={favoritesOpened}
        isPlaying={isPlaying}
        selectedRadio={selectedRadioId}
        onSelectRadio={togglePlayRadio}
      />
    );

  if (!isLarge() && favorites.length)
    return (
      <>
        <Backdrop
          open={favoritesOpened}
          data={favorites}
          onRadioClick={togglePlayRadio}
          isPlaying={isPlaying}
          selectedRadio={selectedRadioId}
        />
        <FAB isOpen={favoritesOpened} onClick={openFavorites} />
      </>
    );

  return null;
};