import { Middleware } from 'koa';
import { Route, method, routeNext, routeHandler } from '../type/Routes';

const routeContain: (handler: routeHandler) => Middleware = handler => async (
    ctx,
    next
) => {
    try {
        ctx.body = { msg: 'no response!' };
        const final = await handler(ctx);
        console.log(final);
    } catch (e) {
        console.log('function : ', handler.name);
        console.log(ctx.request?.body);
        console.error(e);
        ctx.body = JSON.stringify({ msg: 'server error' });
    }
    await next();
};

const useRoute: (
    port: Array<Route>
) => () => Generator<[string | RegExp, method, routeNext], void, void> = port =>
    function* userRoute() {
        for (const each of port) {
            const [url, way] = [...each()];
            yield [each.name, url, routeContain(way)];
        }
    };
export default useRoute;
