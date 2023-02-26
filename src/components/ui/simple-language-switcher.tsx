import { useRouter } from 'next/router'
import React from 'react'

export default function SimpleLanguageSwitcher() {

    const { locale, push, asPath } = useRouter()

    const onClickSwitchLanguage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        const newLocale = locale === 'ar' ? 'en' : 'ar'
        push(asPath, undefined, {
            locale: newLocale,
        });

    }

    return (
        <div>
            <button onClick={(e) => onClickSwitchLanguage(e)} className='text-sm lg:text-lg cursor-pointer'>{locale === 'ar' ? 'English' : 'عربي'}</button>
        </div>
    )
}
