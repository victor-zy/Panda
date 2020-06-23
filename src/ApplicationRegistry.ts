import { SettingOptions } from './SettingOptions';

export class ApplicationRegistry {

    /**
     * @description 设置项目的根目录
     */
    public static settings: SettingOptions = {rootDir: process.cwd() };

    /**
     * @description 令this.settings = options
     * @param _ Function
     * @param options SettingOptions
     */
    public static registerWithOptions(_: Function, options: SettingOptions) {
        this.settings = options;
    }

}