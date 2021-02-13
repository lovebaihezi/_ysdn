import { method, Route, routeHandler, routeNext } from '../../../@types/Routes';
import { Account } from '../../interface/user-interface';
import mongoService from '../../../service/mongo-service';
import useRoute from '../../../router-container';

const login: Route = () => [
    method.post,
    async ctx => {
        const account: Account = ctx.request.body;
        if (account?.username && account?.password) {
            return { msg: 'login success' };
        }
        return { msg: 'login failed' };
    },
];
const register: Route = () => [
    method.post,
    async ctx => ({ msg: 'register success' }),
];
const findMyPassword: Route = () => [
    method.post,
    async ctx => ({ msg: 'reset password to 123456' }),
];

export default function userRouter() {
    return useRoute([login, register, findMyPassword]);
}
