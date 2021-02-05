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

export interface routeNext extends CallableFunction {
    (ctx: Context, next: Next): Promise<{ msg: string }>;
}

const x = async function* () {};

export interface Route extends CallableFunction {
    (): [method: method, next: routeNext];
}

export interface Router {
    [Route: string]: Route;
}
