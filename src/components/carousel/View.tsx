import { FunctionComponent, ComponentProps } from 'react';
import { CarouselHeader } from './CarouselHeader';
import { CarouselBody } from './CarouselBody';

type Props = ComponentProps<typeof CarouselHeader> & ComponentProps<typeof CarouselBody>;
export const View: FunctionComponent<Props> = props => {
  const { data, display, ...rest } = props;
  return (
    <section>
      <CarouselHeader {...rest} />
      <CarouselBody data={data} display={display} />
    </section>
  );
};
