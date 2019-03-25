import React, { Component, ComponentProps, MouseEvent } from 'react';
import { FavoriteBorderIcon, PlayIcon, PauseIcon, VolumeIcon } from '../IconButtons';
import { Image } from '../styled/Image';
import { Placeholder } from '../styled/Placeholder';
import { GridBase, GridItem } from './GridBase';
import { Media } from './Media';
interface IProps {
  onAddFavorite: (e: MouseEvent) => void;
  onPlay: () => void;
  isFavorite: boolean;
  isPlaying: boolean;
  isSelected: boolean;
  name: string;
  image: string;
  label: string;
}
type Props = Partial<ComponentProps<typeof GridBase>> & IProps;
interface IState {
  hovered: boolean;
  loaded: boolean;
}
// export const GridBodyRow: FC<Props> = props => (
export class GridBodyRow extends Component<Props, IState> {
  readonly state: IState = {
    hovered: false,
    loaded: false,
  };
  onImageLoad = () => this.setState({ loaded: true });
  onMouseEnter = () => this.setState({ hovered: true });
  onMouseLeave = () => this.setState({ hovered: false });

  render() {
    return (
      <GridBase
        areas={['playcontrol', 'favorite', 'image', 'title', 'genre', 'options']}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        highlightOnHover={true}
        large={true}
        gutter={true}
        // {...this.props}
      >
        <GridItem gridArea="playcontrol" justifySelf="end" onClick={this.props.onPlay}>
          {/* <div style={{ visibility: this.state.hovered ? 'visible' : 'hidden' }}> */}
          {this.state.hovered ? (
            this.props.isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon size="small" type="light" color="dark" />
            )
          ) : (
            this.props.isPlaying && <VolumeIcon />
          )}
          {/* </div> */}
        </GridItem>
        <GridItem
          gridArea="favorite"
          justifySelf="center"
          onClick={this.props.onAddFavorite}
        >
          <FavoriteBorderIcon
            size="tiny"
            type="light"
            color="dark"
            isFavorite={this.props.isFavorite}
          />
        </GridItem>
        <GridItem gridArea="image" justifySelf="center">
          <Media>
            <Placeholder shouldFadeOut={this.state.loaded} gradient={true}>
              <Image
                src={this.props.image}
                onLoad={this.onImageLoad}
                loaded={this.state.loaded}
              />
            </Placeholder>
          </Media>
        </GridItem>
        <GridItem gridArea="title">{this.props.name}</GridItem>
        <GridItem gridArea="genre">{this.props.label}</GridItem>
        <GridItem gridArea="options">
          {/* <PlayIcon /> */}
          {'icon'}
        </GridItem>
      </GridBase>
    );
  }
}
