import { ControllerMetadata } from './ControllerMetadata';
import { HandlerRegistry } from './HandlerRegistry';
import { ControllerTransformer } from './ControllerTransformer';

export class ControllerRegistry {
    private static _controllers: Map<Function, ControllerMetadata> = new Map();

    public static controllers = ControllerRegistry._controllers;

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

    public static registerAction(type: Function, actionName: string, httpMethod: string, path: string | RegExp = '/') {
        const controllerMetadata = this._getController(type);
        const handlerMetadata = HandlerRegistry.getHandler(type, actionName);

        if (!path) path = '/';

        handlerMetadata.httpMethodAndPaths.push({
            method: httpMethod,
            path
        });

        controllerMetadata.handlers.set(actionName, handlerMetadata);
    }

    public static registerController(type: Function, baseUrl: string | RegExp, isRest: boolean) {
        const controllerMetadata = this._getController(type);
        controllerMetadata.baseUrl = baseUrl;
        controllerMetadata.isRest = isRest;
    }

    /**
   * safe get controller
   *
   * @param type
   * @returns {ControllerMetadata}
   */
    private static _getController(type: Function) {
        let controllerMetadata = this._controllers.get(type);

        if (typeof controllerMetadata === 'undefined') {
            controllerMetadata = new ControllerMetadata(type);
            this._controllers.set(type, controllerMetadata);
        }

        return controllerMetadata;
    }
}
