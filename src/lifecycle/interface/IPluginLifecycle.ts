import { IPluginConfig } from '../../config/interface/IPluginConfig';
import { IVoidFunction } from '../../core/interface/IVoidFunction';

export interface IPluginLifecycle {
    init?: IVoidFunction;
    configWillLoad?: (config: IPluginConfig) => void;
    configDidLoad?: (config: IPluginConfig) => void;
    willUpdate?: (preConfig: IPluginConfig, nextConfig: IPluginConfig) => void;

}