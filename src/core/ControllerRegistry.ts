import { HandlerRegistry } from './HandlerRegistry';
import { ControllerMetadata } from './ControllerMetadata';
import { ControllerTransformer } from './ControllerTransformer';

export class ControllerRegistry {
    // 变量
    private static _controllers: Map<Function, ControllerMetadata > = new Map();

    public static controllers = ControllerRegistry._controllers;

    // 方法
    /**
     * @description
     * safe get controller, 也就是说，我们要先一步判断这个type是不是已经存在了，如果存在，那么直接返回；
     * 如果不存在，也就是说当这个元数据控制器为空的时候，我们就新给它创建一个元数据控制器对象。
     * @param type 
     * @returns {controllerMetadata}
     */
    private static _getController(type: Function) {
        let controllerMetadata = this._controllers.get(type);
        
        if ( typeof controllerMetadata === 'undefined') {
            controllerMetadata = new ControllerMetadata(type);
            this._controllers.set(type, controllerMetadata);
        }
        return controllerMetadata;
    }

    /**
     * @description 通过type这个键，可以得知这个键对应的值是否存在，如果存在，那么就将这个值的url提取出来，并将url赋值给baseURL；
     * 如果这个type键对应的值为空，那么就通过控制器注册并生成一个url, 并将url赋值给baseURL；
     * @param type 
     * @returns {result} 也就是一个路由url 
     */
    public static getRoutes(type?: Function) {
        const result = new Map();

        if (type) {
            const controllerMetadata = this._controllers.get(type);

            if (controllerMetadata) {
                const transformer = new ControllerTransformer(controllerMetadata);
                const router = transformer.transform();
                result.set(controllerMetadata.baseUrl, router);
            }
        } else {
            ControllerRegistry.controllers.forEach(controllerMetadata => {
                const transformer = new ControllerTransformer(controllerMetadata);
                const router = transformer.transform();
                result.set(controllerMetadata.baseUrl, router);
            });
        }
        return result;
    }

    /**
     * @description 通过参数type键 安全的获取到 controllerMetadata 对象，以及通过参数 type 和 actionName 安全获取到 handlerMetadata 对象（将 httpMethod 和 path 写入进去）；
     * 得到一个新的 controllerMetadata 对象；
     * @param type Funtion
     * @param actionName string
     * @param httpMethod string
     * @param path string | RegExp = '/'
     */

    public static registerAction(type: Function, actionName: string, httpMethod: string, path: string | RegExp = '/') {
        const controllerMetadata = this._getController(type);
        const handlerMetadata = HandlerRegistry.getHandler(type, actionName);

        if (!path) path ='/';

        handlerMetadata.httpMethodAndPaths.push({
            method:httpMethod,
            path
        });

        controllerMetadata.handlers.set(actionName, handlerMetadata);

    }

    /**
     * 
     * @param type Function
     * @param baseUrl string | RegExp
     * @param isRest boolean
     */
    public static registerController(type: Function, baseUrl: string | RegExp, isRest: boolean) {
        const controllerMetadata = this._getController(type);
        controllerMetadata.baseUrl = baseUrl;
        controllerMetadata.isRest = isRest;
    }
}