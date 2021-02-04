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
    for (const [hostname, name, method, solve] of transfer([userRoute])) {
        router[method](
            `/${hostname
                .replace(/router/gi, '')
                .replace(/$/, ':')}/${name.replace(/$/, ':')}`,
            solve
        );
    }
    return router;
}
