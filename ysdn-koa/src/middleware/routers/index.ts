import Application from 'koa';
import * as Router from 'koa-router';
import { method, Route, routeNext } from '../../@types/Routes';
import userRoute from './user';

const transfer: (
    source: Array<() => Generator<[string, method, routeNext], void, unknown>>
) => Generator<
    [string, string, method, routeNext],
    void,
    void
> = function* transfer(source) {
    for (const host of source) {
        for (const method of host()) {
            yield [host.name, ...method];
        }
    }
};

export default function x() {
    const router = new Router();
    router.get('/', async (ctx, next) => {
        ctx.response.status = 200;
        ctx.body = 'get';
        await next();
    });
    router.post('/', async (ctx, next) => {
        ctx.response.status = 200;
        ctx.body = 'post';
        await next();
    });
    // router.get('/:whatever', async (ctx, next) => {
    //     ctx.response.status = 404;
    //     ctx.body = '404 Not Found';
    //     await next();
    // });
    // router.post('/:whatever', async (ctx, next) => {
    //     ctx.response.status = 404;
    //     ctx.body = '404 Not Found';
    //     await next();
    // });
    for (const [hostname, name, method, solve] of transfer([userRoute])) {
        console.log(
            `/${hostname.replace(/Route/gi, '')}/${name.replace(/\$/, ':')}`
        );
        router[method](
            `/${hostname.replace(/Route/gi, '')}/${name.replace(/\$/, ':')}`,
            solve
        );
    }
    return router;
}
