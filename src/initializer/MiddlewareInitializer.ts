import * as Koa from 'koa';

import { Application } from '../Application';
import { ApplicationRegistry } from '../ApplicationRegistry';

/**
 * @description 应用初始化中间件加载流程
 * @author tunan
 * @export
 * @class MiddlewreInitializer
 */
export class MiddlewreInitializer {
    private static app: Application;
    private static koaApp: Koa;

    private static initalMiddleware(configs) {
        // 初始化所有应用级别中间件
        const bodyParser = require('koa-bodyparser')(configs['bodyParser']);
        this.koaApp.use(bodyParser);
    }

    static async init(app: Application) {
        this.app = app;
        this.koaApp = this.app.koaApp;

        this.initalMiddleware(ApplicationRegistry.settings);
    }
}
