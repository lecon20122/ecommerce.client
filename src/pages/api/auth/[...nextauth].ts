import { Method } from "axios";
import NextAuth from "next-auth"
import http from '../../../framework/basic-rest/utils/http';
import GoogleProvider from "next-auth/providers/google";
import { API_ENDPOINTS } from '../../../framework/basic-rest/utils/api-endpoints';
import { NextAuthOptions } from 'next-auth/core/types';
import { NextApiRequest, NextApiResponse } from "next";

type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions
//This is for getting the laravel-session cookie and the CSRF cookie 
//from any response of Sanctum or API Breeze
//In my case, the cookies returned are always two and I only need this, 
//so you can edit for get independent of position and cookies.
const getCookiesFromResponse = (res: any) => {
    let cookies = res.headers['set-cookie'][0].split(';')[0] + '; '
    cookies += res.headers['set-cookie'][1].split(';')[0] + '; '
    return cookies
}


//This is to get the X-XSRF-TOKEN from any response of Sanctum or API Breeze, 
//In my case, the token is always returned first, 
//so you can edit for get independent of position
const getXXsrfToken = (res: any) => {
    return decodeURIComponent(res.headers['set-cookie'][0].split(';')[0].replace('XSRF-TOKEN=', ''))
}

//This method works to make any request to your Laravel API
//res_cookies are the cookies of the response of last request you do
//obviously res_cookies is null in your first request that is "/sanctum/csrf-cookie"
const makeRequest = async (method: Method = "GET", url: string, dataForm: any = null, res_cookies: any) => {
    const cookies = res_cookies != null ? getCookiesFromResponse(res_cookies) : null
    const res = await http.request({
        method: method,
        url: url,
        data: dataForm,
        headers: {
            origin: process.env.NEXTAUTH_URL_INTERNAL ?? 'http://localhost:3000', // this is your front-end URL, for example in local -> http://localhost:3000
            Cookie: cookies ?? '', // set cookie manually on server
            "X-XSRF-TOKEN": res_cookies ? getXXsrfToken(res_cookies) : ''
        },
        withCredentials: true,
    })
    return res
}

const nextAuthOptions: NextAuthOptionsCallback = (request: NextApiRequest, response: NextApiResponse) => {
    return {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                authorization: {
                    url: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
                },
            }),
        ],
        callbacks: {
            async jwt({ token, user, account }) {
                if (account?.provider === "google") {
                    const csrf = await makeRequest("GET", API_ENDPOINTS.SANCTUM_COOKIE, null, null)
                    const user = await makeRequest("POST", API_ENDPOINTS.THIRD_PARTY_LOGIN,
                        { token: account?.access_token, provider: "google" }, csrf)
                    const cookies = user.headers['set-cookie'] as string[]
                    response.setHeader('Set-Cookie', cookies)
                    token.user = user.data
                }
                return token
            },
            session({ session, token }) {
                session.user = token.user
                return session
            },

        },
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}


