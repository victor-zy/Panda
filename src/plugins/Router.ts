import * as KoaRouter from 'koa-router';
import { Middleware } from 'koa';

export class Router {
    private static _routers: KoaRouter[] = [new KoaRouter()];

    private static _addRouter(method:string, path: string|string[] |Middleware, args: Middleware[]) {
        const [router] = this._routers;
        if (method in router && router[method] instanceof Function) {
            router[method] (path,...args);
        }
    }

    static get routers() {
        return this._routers;
    }

    static use(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('use', path, args);
    }

    static post(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('post', path, args);
    }

    static put(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('put', path, args);
    }

    static head(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('head', path, args);
    }

    static delete(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('delete', path, args);
    }

    static options(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('options', path, args);
    }

    static trace(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('trace', path, args);
    }

    static patch(path: string|string[]|Middleware, ...args: Middleware[]) {
        this._addRouter('patch', path, args);
    }

    static namespace(name: string) {
        const router = new KoaRouter({ prefix: name });
        this._routers.push(router);

        return router;
    }
}