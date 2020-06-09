import { IAppConfig } from '../../config/interface/IAppConfig';
import { IVoidFunction } from '../../core/interface/IVoidFunction';

export interface IAppLifeCycle {
    init?: IVoidFunction;
    configWillLoad?: IVoidFunction;
    configDidLoad?: (config: IAppConfig) => void;
    pluginWillLoad?: IVoidFunction;
    pluginDidLoad?: IVoidFunction;
    beforeReady?: IVoidFunction;
    ready?: IVoidFunction;
    afterReady?: IVoidFunction;
    beforeClose?: IVoidFunction;
}
