import { method, Route, routeHandler, routeNext } from '../../../@types/Routes';
import { account, auth } from '../../../@types/interface';
import mongoService from '../../../service/mongo-service';

import useRoute from '../../../router-container';
import { Document } from 'mongoose';

const tips = ['account not found', 'password wrong'];

const login: Route = () => [
    method.post,
    async ctx => {
        const auth = ctx.request.body;
        if (auth?.username && auth?.password) {
            let result: Array<(auth & Document) | null> = [];
            for await (const I of mongoService.findAuth(auth)) {
                result.push(I);
            }
            const [accountCheck, passwordCheck] = result;
            if (accountCheck) {
                if (passwordCheck) {
                    ctx.body = await mongoService.getUser(passwordCheck?._id);
                    return { msg: 'access granted' };
                } else {
                    ctx.body = { msg: 'wrong password' };
                }
            } else {
                ctx.body = { msg: 'you have not register!' };
            }
        } else {
            ctx.body = { msg: 'access denied' };
        }
        return { msg: 'access denied' };
    },
];
const register: Route = () => [
    method.post,
    async ctx => {
        const account: account & {
            username: string;
            password: string;
            confirmPassword: string;
        } = ctx?.request?.body;
        if (
            account &&
            account?.username &&
            account?.password &&
            account?.confirmPassword &&
            account?.password === account?.confirmPassword
        ) {
            try {
                const result = await mongoService.insertUser({
                    auth: {
                        username: account.username,
                        password: account.password,
                    },
                    nickname: account.nickname,
                    telephone: account?.telephone,
                    email: account?.email,
                    avatarUrl: account?.avatarUrl,
                    createTime: new Date(),
                });
                ctx.body = result;
                return { msg: 'access granted' };
            } catch (e) {
                ctx.body = { msg: new Error(e)?.message.toString() };
                return { msg: `server error : ${JSON.stringify(e)}` };
            }
        } else {
            ctx.body = { msg: 'access denied' };
        }
        return { msg: 'access denied' };
    },
];
const findMyPassword: Route = () => [
    method.post,
    async ctx => ({ msg: 'reset password to 123456' }),
];

const getAllArticle: Route = () => [
    method.post,
    async ctx => {
        const { userId } = ctx.request?.body;
        if (userId) {
            ctx.body = await mongoService.getAllArticle(userId);
            return { msg: 'access granted' };
        } else {
            ctx.body = { msg: 'access denied' };
        }
        return { msg: 'access denied' };
    },
];

export default function userRouter() {
    return useRoute([login, register, findMyPassword, getAllArticle]);
}
