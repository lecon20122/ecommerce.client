import Text from '@components/ui/text';
import StarIcon from '@components/icons/star-icon';
import QuoteIcon from '@components/icons/quote-icon';
import cn from 'classnames';
import QuoteIconRotate from '@components/icons/quote-icon-rotate';

interface Props {
  item: any;
  type?: 'rounded' | 'circle' | 'modern';
  disableBoarderRadius?: boolean;
  demoVariant?: 'ancient';
}

const TestimonialCard: React.FC<Props> = ({ item, type, disableBoarderRadius = false, demoVariant }) => {
  return (
    <div
      className={`bg-gray-200 w-full ${
        !disableBoarderRadius && 'rounded-md'
      } p-6 md:p-8 lg:p-6 xl:p-8 transition duration-300 ease-in-out mx-auto md:mx-0`}
    >
      <div
        className={cn('', {
          'flex items-center gap-3.5': type === 'modern',
        })}
      >
        <div
          className={cn('w-[90px]', {
            'w-[70px]': type === 'modern',
          })}
        >
          <img
            src={item.avatar.src}
            alt={item.name}
            className={cn('rounded-full border-[5px] border-white', {
              'border-0': type === 'modern',
              'shadow-avatar': demoVariant !== 'ancient',
            })}
          />
        </div>

        <div>
          <Text
            variant="mediumHeading"
            className={cn('2xl:text-2xl mt-4 xl:mt-7', {
              'text-lg 2xl:text-lg font-bold mt-0 xl:mt-0 mb-1': type === 'modern',
            })}
          >
            {item.name}
          </Text>
          {type === 'modern' && <span className="text-base text-[#5A5A5A] font-normal">from Duisbarg</span>}
        </div>

        {type !== 'modern' ? (
          <div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
            {Array.from({ length: item.rating }).map((_, idx) => (
              <StarIcon key={idx} />
            ))}
            {Array.from({ length: 5 - item.rating }).map((_, idx) => (
              <StarIcon color="#e6e6e6" key={idx} />
            ))}
          </div>
        ) : (
          <>
            {demoVariant !== 'ancient' && (
              <div className="ms-auto flex items-center space-x-2">
                <StarIcon />
                <span className="text-base font-semibold">4.5</span>
              </div>
            )}
          </>
        )}
      </div>
      <Text
        className={cn('text-sm sm:leading-7 lg:text-base lg:leading-[1.625rem] mt-5 xl:mt-7', {
          'font-normal !leading-7 !lg:leading-7 tracking-[-0.1px]': type === 'modern',
        })}
      >
        {type !== 'modern' && <QuoteIcon className="mb-3 xl:mb-4" />}
        {item.text}
        {type === 'modern' && <QuoteIconRotate className="mt-3 xl:mt-4 ml-auto" />}
      </Text>
    </div>
  );
};

export default TestimonialCard;
