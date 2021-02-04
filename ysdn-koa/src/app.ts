import Koa from 'koa';
const app = new Koa();
import useMiddleware from './middleware';

export default () => {
    return async (hostname: string, port: number) => {
        useMiddleware(app);
        app.listen(
            // hostname,
            port,
            console.log.bind(console, 'koa server start')
        );
    };
};
