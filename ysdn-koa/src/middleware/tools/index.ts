import * as parse from 'koa-bodyparser';

import {
    DefaultContext,
    DefaultState,
    Middleware,
    ParameterizedContext,
} from 'koa';
const parser = parse({ extendTypes: { json: ['application/json'] } });
const f: Middleware<
    ParameterizedContext<DefaultState, DefaultContext>
> = async (ctx, next) => {
    if (ctx.method === 'post') {
        console.log(ctx?.request?.body);
    }
    await next();
};
export { parser, f };
