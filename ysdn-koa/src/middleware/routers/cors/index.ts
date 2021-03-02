import { Context, Next } from 'koa';
export default async (ctx: Context, next: Next) => {
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
    await next();
};
