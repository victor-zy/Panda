export class LodashUtil {
    static merge(source: object, ...args: (object|undefined)[]) {
        for (const arg of args) {
            Object.assign(source, arg || {});
        }

        return source;
    }

    static get(source: any, expression: any) {
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

        return result;
    }
}
