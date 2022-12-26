import Link from '@components/ui/link';
import Image from 'next/image';
import type { FC } from 'react';
import { useWindowSize } from '@utils/use-window-size';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { CategoryBanner } from '../../framework/basic-rest/types';

interface BannerProps {
  banner: CategoryBanner;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps['href'];
  disableBorderRadius?: boolean;
}

const BannerCard: FC<BannerProps> = ({
  banner,
  className,
  variant = 'rounded',
  effectActive = false,
  classNameInner,
  href,
  disableBorderRadius = false,
}) => {
  const { name } = banner;

  return (
    <div className={cn('mx-auto', className)}>
      <Link href={href} className={cn('h-full group flex justify-center relative overflow-hidden', classNameInner)}>
        <Image
          src={banner.url}
          width={banner.width}
          height={banner.height}
          alt={name}
          loading = "eager"
          quality={100}
          className={cn('bg-gray-300 object-cover w-full', {
            'rounded-md': variant === 'rounded' && !disableBorderRadius,
          })}
        />
        {effectActive && (
          <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BannerCard;
