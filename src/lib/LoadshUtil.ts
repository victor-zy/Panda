export class LoadshUtil {

    /**
     * @description 这又是干什么的？？？？？？
     * @param source any
     * @param expression any 
     * @returns result 
     */
    static get(source: any, expression: any) {
        // console.log('expression2:'+ expression);
        // console.log('source: '+ source);
        if (!source) {
            return undefined;
        }

        if (typeof expression !== 'string' || expression.indexOf('.') === -1) {
            return source[expression];
        }

        const keys = expression.split('.');
        let result: any;

        for (const key of keys) {
            result = (result || source)[key];
            if (!result) {
                return undefined;
            }
        }
        console.log('result: '+ result);
        return result;
    }

    /**
     * @description 合并类似于配置这些的对象，但没搞懂诶，为什么要合并配置？
     * @param source 
     * @param args 
     * @returns source 
     */
    static merge(source: object, ...args: (object | undefined)[]) {
        // console.log('source: '+ source)
        for (const arg of args) {
            Object.assign(source, arg || {});
        }

        return source;
    }
}