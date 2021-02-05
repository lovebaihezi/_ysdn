import * as parser from 'koa-bodyparser';
import * as boom from '@hapi/boom';
import {
    DefaultContext,
    DefaultState,
    Middleware,
    ParameterizedContext,
} from 'koa';
const x = parser();
const f: Middleware<
    ParameterizedContext<DefaultState, DefaultContext>
> = async (ctx, next) => {
    console.log(ctx.url);
    console.log(ctx.request.body);
    await next();
};
export { x, f };
