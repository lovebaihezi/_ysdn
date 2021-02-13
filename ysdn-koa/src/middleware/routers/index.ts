import * as Router from 'koa-router';
import { method, routeNext } from '../../@types/Routes';
import userRoute from './user';
import blogRouter from './blog';
import staticRouter from './static';
import cors from './cors';
import $404 from './404';

const routes = () => [userRoute, blogRouter];

const transfer: (
    source: Array<
        () => () => Generator<
            [string | RegExp, method, routeNext],
            void,
            unknown
        >
    >
) => Generator<
    [string, string | RegExp, method, routeNext],
    void,
    void
> = function* transfer(source) {
    for (const host of source) {
        for (const method of host()()) {
            yield [host.name, ...method];
        }
    }
};

export default function () {
    const router = new Router();
    router.get('/', staticRouter);
    router.options(/.*/, async (ctx, next) => {
        ctx.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        });
        ctx.status = 200;
        ctx.body = { msg: 'yes' };
        await next();
    });
    router.post(/.*/g, $404);
    router.post(/.*/g, cors);
    for (const [hostname, route, method, solve] of transfer(routes())) {
        console.log(
            `${method} : /${hostname.replace(/Router/gi, '')}/${route}`
        );
        router[method](`/${hostname.replace(/Router/gi, '')}/${route}`, solve);
    }
    return router;
}
