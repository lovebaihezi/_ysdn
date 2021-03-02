import * as fs from 'fs/promises';
import { Context } from 'koa';
export default async (ctx: Context) => {
    ctx.redirect('localhost:3000');
};
