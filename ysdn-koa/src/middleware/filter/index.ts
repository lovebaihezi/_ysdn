import { Context, Middleware, Next } from 'koa';
import * as Routes from '../routers';

const Routing = function* () {
    for (const Route of Object.values(Routes)) {
        yield [Route];
    }
};

export default async (ctx: Context, next: Next) => {};
