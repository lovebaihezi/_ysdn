import { Context, Next } from 'koa';

enum statusCodeMessage {
    $200 = '200 connect',
    $404 = '404 Not Found',
}

export default async (ctx: Context, next: Next) => {
    await next();
    if (ctx.body === undefined) {
        ctx.status = 404;
        ctx.body = { msg: statusCodeMessage.$404 };
    }
};
