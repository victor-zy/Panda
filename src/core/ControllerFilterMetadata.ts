import { FilterOptions } from './FilterOptions';
import { FilterMetadata } from './FilterMetadata';
export class ControllerFilterMetadata {
    // 变量
    private _filterMetadata: FilterMetadata;

    private _only: string[];

    private _except: string[];

    // 方法
    get filterMetadata(): FilterMetadata {
        return this._filterMetadata;
    }

    get only(): string[] {
        return this._only;
    }

    get except(): string[] {
        return this._except;
    }

    constructor(filterMetadata: FilterMetadata, options?: FilterOptions) {
        this._filterMetadata = filterMetadata;

        if (options && options.only) {
            this._only = options.only;
        }

        if (options && options.except) {
            this._except = options.except;
        }
    }
}