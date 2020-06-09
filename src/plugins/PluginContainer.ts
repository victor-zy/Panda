import * as Path from 'path';
import * as Fs from 'fs';
import { LodashUtil } from '../lib/LodashUtil';

export class PluginContainer {
    private static pluginsFiles: string [] = [];
    private static plugin_config: any;

    private static _pluginRoot: string;

    private static _setPluginRoot(path: string) {
        this._pluginRoot = path;
    }

    static get pluginRoot() {
        return this._pluginRoot;
    }

    /**
     *
     * @param path
     */
    public static async registerPlugin(path: string) {
        if (path.endsWith('/')) {
            path.replace(/\/$/, '');
        }


        if (!this.pluginRoot) {
            this._setPluginRoot(path);
        }


        const names = Fs.readdirSync(path);
        for (const name of names) {
            const p = Path.resolve(path, name);
            const stat = Fs.statSync(p);

            if (stat.isDirectory()) {
                this.registerPlugin(p);
            }
            else {
                if (name.endsWith('.js')) {
                    this.pluginsFiles.push(p);

                    try {
                        const pluginName = p.replace(this.pluginRoot + '/', '').replace(/\.js$/, '');
                        const plugin = require(p);

                        this.plugin_config = LodashUtil.merge({}, this.plugin_config, {
                            [pluginName]: plugin instanceof Function ? (await plugin()) : plugin
                        });
                    } catch (err) {
                        console.log(`[TYPED][ERR] ${path} load error`);
                    }
                }
            }
        }
    }

    public static get(expression: string) {
        return LodashUtil.get(this.plugin_config, expression);
    }
}
