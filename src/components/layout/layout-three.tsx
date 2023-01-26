import { NextSeo } from 'next-seo'
import Header from '@components/layout/header/header-three'
import { default as Footer } from '@components/layout/footer/footer-two'
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation'
import CookieBar from '@components/common/cookie-bar'
import { useAcceptCookies } from '@utils/use-accept-cookies'
import Button from '@components/ui/button'
import { useTranslation } from 'next-i18next'
import Router from 'next/router';
import Spinner from '@components/loading/Spinner'
import { useState } from 'react';

const Layout: React.FC = ({ children }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { t } = useTranslation('common')

  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  return (
    <div className='flex flex-col min-h-screen'>
      <NextSeo
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
        title='Modaje Shopping Online'
        description='Modaje Shopping Experience'
        canonical='https://modaje.com/'
        openGraph={{
          url: 'https://modaje.com/',
          title: 'Modaje Shopping Online',
          description:
            'Modaje Shopping Experience',
          images: [
            {
              url: '/assets/images/og_image.webp',
              width: 800,
              height: 600,
              alt: 'Modaje',
            },
          ],
        }}
      />
      <Header />
      <main
        className='relative flex-grow'
        style={{
          minHeight: '-webkit-fill-available',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {loading && <Spinner />}
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      {/* <Search /> */}
      <CookieBar
        title={t('text-cookies-title')}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant='slim'>
            {t('text-accept-cookies')}
          </Button>
        }
      />
    </div>
  )
}

export default Layout
