import { Context, Next } from 'koa';

export enum method {
    post = 'post',
    get = 'get',
    put = 'put',
    del = 'del',
}

//TODO : create function for every API like :

/*
 * like :
 * async function *(ctx,next) {yield async (ctx) => {solve(ctx)} ;yield await next();}
 */

export interface routeHandler extends CallableFunction {
    (ctx: Context): Promise<{ msg: string }>;
}

export interface routeNext extends CallableFunction {
    (ctx: Context, next: Next): void;
}

export interface Route extends CallableFunction {
    (): [method: method, next: routeHandler];
}

export interface Router {
    [Route: string]: Route;
}
