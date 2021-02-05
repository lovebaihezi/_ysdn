import { method, Route, routeNext } from '../../../@types/Routes';
import { Account } from '../../interface/user-interface';
import mongoService from '../../../service/mongo-service';

export const login: Route = () => [
    method.post,
    async (ctx, next) => {
        const account: Account = ctx?.request?.body;
        if (
            account?.username !== undefined &&
            account?.password !== undefined
        ) {
            ctx.body = ctx.request.body;
            return { msg: 'success' };
        } else {
            return {
                msg: `invalid account for ${(() =>
                    account?.username
                        ? 'account username is missing'
                        : account?.password
                        ? 'account password is missing'
                        : 'unexpected account ')()}`,
            };
        }
    },
];

export const register: Route = () => [
    method.post,
    async (ctx, next) => {
        const account: Account = ctx?.request?.body;
        if (account?.username && account?.password) {
            ctx.body = ctx.request.body;
        }
        return {
            msg: `invalid account for ${
                account?.username
                    ? 'account username is missing'
                    : account?.password
                    ? 'account password is missing'
                    : 'unexpected account '
            }`,
        };
    },
];
export const findMyPassword: Route = () => [
    method.post,
    async (ctx, next) => {
        const username: string = ctx.request.body;
        let information = 'unexpected error';
        if (username !== undefined) {
            ctx.body = ctx.request.body;
        }
        return {
            msg: `username : ${information}`,
        };
    },
];

const userRoute: (
    port: Array<Route>
) => () => Generator<[string, method, routeNext], void, void> = port =>
    function* userRoute() {
        for (const each of port) {
            yield [each.name, ...each()];
        }
    };

export default userRoute([login, register, findMyPassword]);
