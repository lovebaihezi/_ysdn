import Application, { Middleware } from 'koa';
import useRoute from './routers';
import userRoute from './routers/user';
import * as tools from './tools';

export interface MiddlewareObject {
    [route: string]: Middleware;
}

function* middleware(resource: Array<MiddlewareObject>) {
    for (const MiddlewareObjects of resource) {
        yield* [...Object.values(MiddlewareObjects)];
    }
}

export default function (app: Application) {
    [...middleware([tools])].forEach(f => app.use(f));
    app.use(useRoute().routes());
}
