import Koa from 'koa';
const app = new Koa();
import useMiddleware from './middleware';

export default () => {
    return async (port: number) => {
        useMiddleware(app);
        app.listen(port, console.log.bind(console, 'koa server start'));
    };
};
