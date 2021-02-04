import { Context, Next } from 'koa';

export enum method {
    post = 'post',
    get = 'get',
    put = 'put',
    del = 'del',
}

export interface routeNext extends CallableFunction {
    (ctx: Context, next: Next): { msg: string };
}

export interface Route extends CallableFunction {
    (): [method: method, next: routeNext];
}

export interface Router {
    [Route: string]: Route;
}
