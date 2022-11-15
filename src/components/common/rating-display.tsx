import { FC } from 'react';
import StarIcon from '@components/icons/star-icon';
import StarIconStroke from '@components/icons/star-icon-stroke';
import StarIconHalf from '@components/icons/star-icon-half';

interface Props {
  rating?: number;
}

const RatingDisplay: FC<Props> = ({ rating = 3.5 }) => {
  const highestValue = 5;

  return (
    <div className="flex space-x-[3px] mb-1 md:mb-0 md:space-x-1.5">
      {Array.from({ length: parseInt((rating >= highestValue ? highestValue : rating) + '') })?.map((_: any, id: number) => (
        <StarIcon key={`star-fill-icon-${id}`} />
      ))}
      {!!(rating < highestValue && parseFloat(String(rating)).toString().split('.')[1]) && <StarIconHalf />}
      {Array.from({
        length:
          highestValue -
          (parseInt((rating >= highestValue ? highestValue : rating) + '') +
            Number(
              !!parseFloat(rating + '')
                .toString()
                .split('.')[1]
            )),
      })?.map((_: any, id: number) => (
        <StarIconStroke key={`star-fill-icon-${id}`} />
      ))}
    </div>
  );
};

export default RatingDisplay;
