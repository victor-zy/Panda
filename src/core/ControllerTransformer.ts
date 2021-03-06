import { Router } from './../plugins/Router';
import { ControllerMetadata } from './ControllerMetadata';
import * as KoaRouter from 'koa-router';
export class ControllerTransformer {
    // 变量
    private _controllerMetadata: ControllerMetadata;

    private _router: KoaRouter;


    // 方法
    get controllerMetadata(): ControllerMetadata {
        return this._controllerMetadata;
    }

    constructor(controllerMetadata: ControllerMetadata) {
        this._controllerMetadata = controllerMetadata;
        this._router = Router.namespace(String(controllerMetadata.baseUrl));
    }

    public transform() {
        this._controllerMetadata.handlers.forEach(handlerMetadata => {
            const actionName = handlerMetadata.actionName;
            const action = async (ctx, next)=>{
                await (new (this._controllerMetadata.type as any)(ctx)[actionName](ctx, next));
            };
            
            handlerMetadata.httpMethodAndPaths.forEach(httpMethodAndPath =>{
                this._router[httpMethodAndPath.method](httpMethodAndPath.path, action);
            });
        });

        return this._router;
    }
}