import { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";

export const getAuthSession = async (ctx: {
    req: GetServerSidePropsContext['req'];
    res: GetServerSidePropsContext['res'];
}) => {
    return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions as any);
}