import { ConvertUtil } from '../lib/ConvertUtil';
import { HandlerParamMetadata } from './HandlerParamMetadata';
import { Reflection } from './Reflection';
import { HandlerMetadata } from './HandlerMetadata';
import { HandlerParamOptions } from './HandlerParamOptions';
import { ParamType } from './enum/ParamType';
export class HandlerRegistry {
    // 变量
    private static _handlers: Map<Function, Map<string, HandlerMetadata>> = new Map();


    // 方法
    /**
     * safe get HandlerMetadata ,到底是怎么安全的得到呢？
     * 通过 HandlerMetadata 这个对象，根据type键在里面查找对应的值，如果这个值为空，那就用这个type新建一个 Map 对象 handlerStore，
     * 这个时候，我们再用 actionName 这个键从 handlerStore 对象中查找对应的值，并将这个值赋值给 handlerMetadata ；
     * 如果 handlerMetadata 也为空，就用 type 和 actionName 在 HandlerMetadata 对象里新建一个对象
     * @param type 
     * @param actionName 
     * @returns handlerMetadata 对象
     */
    public static getHandler(type: Function, actionName: string) {
        let handlerStore = this._handlers.get(type);

        if (typeof handlerStore === 'undefined' ){
            handlerStore = new Map();
            this._handlers.set(type,handlerStore);
        }

        let handlerMetadata = handlerStore.get(actionName);
        if (typeof handlerMetadata === 'undefined') {
            handlerMetadata = new HandlerMetadata(type, actionName);
            const params = Reflection.getParams(type.prototype, actionName);// 从这里大脑开始了迟钝，没看懂这个的意思

            if (params) {
                const handlerParams = params.map((returnType, index) => new HandlerParamMetadata(type, actionName, index, returnType)); //这个的意思是真的难搞哦，搞不懂
                const handlerParamsMap: Map<number, HandlerParamMetadata> = ConvertUtil.convertArrayToMap(handlerParams);//妈哟，这个也没看懂；

                handlerMetadata.params = handlerParamsMap;
            }

            handlerStore.set(actionName, handlerMetadata);
        }

        return handlerMetadata;
        
    }



    /**
     * 
     * @param type 
     * @param actionName 
     * @param index 
     * @param paramType 
     * @param expression 
     * @param options 
     */
    public static registerParam(type: Function, actionName: string, index: number, paramType: ParamType, expression: string, options?: HandlerParamOptions)
    {
        const handlerMetadata = this.getHandler(type, actionName);

        const params = Reflection.getParams(type.prototype, actionName);
        const returnType = params[index];

        const handlerParam = new HandlerParamMetadata(type, actionName, index, returnType, paramType, expression);

        handlerParam.setOptions(options);

        handlerMetadata.params.set(index, handlerParam);
    }

    
}