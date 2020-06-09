import { SettingOptions } from './SettingOptions';
export class ApplicationRegistry {
    public static settings: SettingOptions = { rootDir: process.cwd() };

    public static registerWithOptions(_: Function, options: SettingOptions) {
        this.settings = options;
    }
}
