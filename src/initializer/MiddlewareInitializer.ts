import * as Koa from 'koa';

import { Application } from '../Application';
import { ApplicationRegistry } from '../ApplicationRegistry';

/**
 * @description 应用初始化中间件加载流程
 * @author tunan
 * @export
 * @class MiddlewareInitializer
 */
export class MiddlewareInitializer {
    private static app: Application;
    private static koaApp: Koa;

    /**
     * @description 初始化所有应用级别中间件
     * @param configs 项目目录
     * @example const bodyParser 这个常量最终是 Koa的[AsyncFunction: bodyParser]
     */
    private static initalMiddleware(configs) {
        const bodyParser = require('koa-bodyparser')(configs['bodyParser']);// [AsyncFunction: bodyParser]
        // console.info(require('koa-bodyparser')(configs['bodyParser']))
        // console.log('11111111111bodyParser:'+ bodyParser);
        this.koaApp.use(bodyParser);
    }

    /**
     * @description 对 initalMiddleware 的封装
     * @param app Application
     */
    static async init(app: Application) {
        this.app = app;
        this.koaApp = this.app.koaApp;

        this.initalMiddleware(ApplicationRegistry.settings);
    }
}
