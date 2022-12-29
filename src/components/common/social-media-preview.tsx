import Head from 'next/head'
import React from 'react'
interface Props {
    title?: string
    description?: string,
    fb_url?: string
    fb_type?: string
    fb_title?: string
    fb_description?: string
    fb_image?: string
    fb_image_width?: string
    fb_image_height?: string
    tw_url?: string
    tw_title?: string
    tw_description?: string
    tw_image?: string
}

export default function SocialMediaPreview({
    title = "Modaje Shopping Online",
    description = "Modaje Shopping Experience",
    fb_description = "Modaje Shopping Experience",
    fb_image,
    fb_image_width = "300",
    fb_image_height = "300",
    fb_title = "Modaje Shopping Online",
    fb_type = "website",
    fb_url = "https://www.modaje.com/",
    tw_description = "Modaje Shopping Experience",
    tw_image = "../../../public/assets/images/og_image.webp",
    tw_title = "Modaje Shopping Online",
    tw_url = "https://www.modaje.com/",
}: Props) {
    return (
        <Head>
            {/* <!-- HTML Meta Tags --> */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content={fb_url} />
            <meta property="og:type" content={fb_type} />
            <meta property="og:title" content={fb_title} />
            <meta property="og:description" content={fb_description} />
            <meta property="og:image" itemProp='image' content={fb_image} />
            <meta property="og:image:width" content={fb_image_width} />
            <meta property="og:image:height" content={fb_image_height} />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="modaje.com" />
            <meta property="twitter:url" content={tw_url} />
            <meta name="twitter:title" content={tw_title} />
            <meta name="twitter:description" content={tw_description} />
            <meta name="twitter:image" content={tw_image} />
        </Head>
    )
}
