import * as koa from 'koa';
const app = new koa();
import * as parser from 'koa-bodyparser';
app.use(parser());
app.use(async (ctx, next) => {
    console.log(ctx.req);
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    });
    await next();
});

app.use(async (ctx, next) => {
    ctx.body = 123;
    await next();
});

app.use(async ctx => {
    if (ctx.body === undefined) {
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }
});

app.listen(8001);
