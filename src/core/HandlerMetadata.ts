import { HandlerParamMetadata } from './HandlerParamMetadata';
import { HTTPMethodAndPath } from './HTTPMethodAndPath';

export class HandlerMetadata {
    // 变量
    private _params: Map<number, HandlerParamMetadata>;

    private _isErrorHandler: boolean;

    private _type: Function;

    private _actionName: string;

    private _httpMethodAndPaths: HTTPMethodAndPath[];

    
    // 方法
    get params(): Map<number, HandlerParamMetadata> {
        return this._params;
    }

    get isErrorHandler(): boolean {
        return this._isErrorHandler;
    }

    get type(): Function {
        return this._type;
    }

    get actionName(): string {
        return this._actionName;
    }

    get httpMethodAndPaths(): HTTPMethodAndPath[] {
        return this._httpMethodAndPaths;
    }

    set params(value: Map<number, HandlerParamMetadata>) {
        this._params = value;
    }

    set isErrorHandler(value: boolean) {
        this._isErrorHandler = value;
    }

    constructor (type: Function, actionName: string,param?: Map<number,HandlerParamMetadata>, isErrorHandler?: boolean) {
        this._type = type;
        this._actionName = actionName;

        if (typeof param !== 'undefined'){
            this._params = param;
        } else {
            this._params = new Map();
        }

        if (typeof isErrorHandler !== 'undefined') {
            this._isErrorHandler = isErrorHandler;
        } else {
            this._isErrorHandler = false;
        }

        this._httpMethodAndPaths = [];
    }
}