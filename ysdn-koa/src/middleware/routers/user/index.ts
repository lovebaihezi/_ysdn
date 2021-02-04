import { method, Route, routeNext } from '../../../@types/Routes';
import { Account } from '../../interface/user-interface';
import mongoService from '../../../service/mongo-service';
import { NoEmitOnErrorsPlugin } from 'webpack';

export const login: Route = () => [
    method.post,
    (ctx, next) => {
        const account: Account = ctx?.request?.body;
        if (
            account?.username !== undefined &&
            account?.password !== undefined
        ) {
        }
        return {
            msg: `invalid account for ${(() =>
                account?.username
                    ? 'account username is missing'
                    : account?.password
                    ? 'account password is missing'
                    : 'unexpected account ')()}`,
        };
    },
];

export const register: Route = () => [
    method.post,
    (ctx, next) => {
        const account: Account = ctx?.request?.body;
        if (account?.username && account?.password) {
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
    (ctx, next) => {
        const username: string = ctx.request.body;
        let information = 'unexpected error';
        if (username !== undefined) {
        }
        return {
            msg: `username : ${information}`,
        };
    },
];

const userRoute: (
    port: Array<Route>
) => () => Generator<[string, method, routeNext], void, void> = port =>
    function* () {
        for (const each of port) {
            yield [each.name, ...each()];
        }
    };

export default userRoute([login, register, findMyPassword]);
