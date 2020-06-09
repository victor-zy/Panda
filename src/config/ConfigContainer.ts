import * as Path from 'path';
import * as Fs from 'fs';
import { LodashUtil } from '../lib/LodashUtil';

export class ConfigContainer {
    private static configFiles: string[] = [];
    private static config: any;

    private static _configRoot: string;

    private static _setConfigRoot(path: string) {
        this._configRoot = path;
    }

    static get configRoot() {
        return this._configRoot;
    }

    /**
     *
     * @param path
     */
    public static async registerConfig(path: string) {
        if (path.endsWith('/')) {
            path.replace(/\/$/, '');
        }
        // console.log('_configRoot', this._configRoot)

        if (!this._configRoot) {
            this._setConfigRoot(path);
        }
        // console.log('_setConfigRoot:', this._setConfigRoot(path));

        const names = Fs.readdirSync(path);
        for (const name of names) {
            // 拼接完整路径
            const p = Path.resolve(path, name);
            // console.log('p:', p);

            // 获得路径信息
            const stat = Fs.statSync(p);
            // console.log('11111111 stat:', stat);

            if (stat.isDirectory()) {
                // 如果是目录的话，进入下一级,这是一个递归
                this.registerConfig(p);
            }
            else {
                // 如果是文件的话
                if (name.endsWith('.js')) {
                    // 只接受 js 文件配置
                    this.configFiles.push(p);

                    try {
                        // 提取配置空间
                        const configName = p.replace(this.configRoot + '/', '').replace(/\.js$/, '');
                        // 读取配置
                        const config = require(p);
                        // 合并配置
                        this.config = LodashUtil.merge({}, this.config, {
                            // 如果是返回一个 方法的话，则返回值是配置
                            [configName]: config instanceof Function ? (await config()) : config
                        });
                    } catch (err) {
                        console.log(`[TYPED][ERR] ${path} load error`);
                    }
                }
            }
        }
    }

    public static get(expression: string) {
        return LodashUtil.get(this.config, expression);
    }
}
