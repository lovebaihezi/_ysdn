import Application, {
    DefaultContext,
    DefaultState,
    Middleware,
    ParameterizedContext,
} from 'koa';
import useRoute from './routers';
import * as tools from './tools';

//TODO: HOF | 装饰器 通过高阶函数(或装饰器)包裹路由处理函数,尽量使得传入参数只有Context并且返回值应当为Context.body的值
//TODO: 根据接口自动生成简单测试代码
//TODO: 自动生成新接口脚本

export default function (app: Application) {
    [...Object.values(tools)].forEach(tool => app.use(tool));
    const Router = useRoute();
    app.use(Router.routes()); //this method will show all the routes!
    // app.use(Router.allowedMethods());
}
