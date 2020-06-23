import * as child_process from 'child_process';
import { LoadshUtil } from './../lib/LoadshUtil';
import * as Path from 'path';
import * as Fs from 'fs';

export class ConfigContainer {
    // 变量
    public static _configRoot: string;
    private static configFiles: string[] = [];
    private static config: any;


    // 方法
    private static _setConfigRoot(path: string) {
        this._configRoot = path;
    }

    static get configRoot() {
        return this._configRoot;
    }

    /**
     * @description 注册配置，这个的注释还是不明确，理解了20%；
     * 现在我理解了作用，就是将config文件夹底下的js配置文件进行合并，但这样做
     * 的意义在于什么呢？
     * @param path 
     */
    public static async registerConfig(path: string) {
        console.log('Path: ' + path);
        if (path.endsWith('/')) {
            path.replace(/\/$/, '');
        }
        if (!this._configRoot) {
            // console.info('jia jia : ' + this._configRoot)
            this._setConfigRoot(path);
        }
        // console.log('path:',path)
        const names = Fs.readdirSync(path);
        // console.log('1',names);
        for (const name of names) {
            //    拼接完整路径
            const p = Path.resolve(path, name);
            // console.log(p);

            const stat = Fs.statSync(p);

            // console.log('stat: ' + stat);

            if (stat.isDirectory()) {
                // 如果是目录的话，会进入下一级，递归思想
                this.registerConfig(p);
            }
            else {
                if (name.endsWith('.js')) {
                    this.configFiles.push(p);

                    try {
                        const configName = p.replace(this.configRoot + '/', '').replace(/\.js$/, '');
                        // console.info(configName);// plugin
                        const config = require(p);// {}
                        // console.info(config);
                        // 这里是合并配置，但为什么要合并呢？
                        // 2020-6-17 终于搞懂了这个this.config ；我前面几天在编译的时候，程序没有进入这一步，但重启编译器之后，进入这步，这个this.config：{ plugin: {} }
                        this.config = LoadshUtil.merge({}, this.config, {
                            [configName]: config instanceof Function ? (await config()) : config
                        });
                        console.log('配置信息（一个写入的过程）：', this.config);
                    }
                    catch (err) {
                        console.log(`[TYPED] [ERR] ${path} load error`);
                    }
                }
            }
        }
    }

    /**
     * @description 没搞懂要干什么啊~~~~~~~~~~~~~
     * @param expression string
     */
    public static get(expression: string) {
        // console.info('this.config:'+ this.config);
        // console.info('expression:' + expression)//expression:app.server.port
        return LoadshUtil.get(this.config, expression);
    }

    // /**
    //  * @description 加载配置，表示程序启动时文件或者信息的载入,这个载入是一个读取的过程
    //  * @param path 这是configWillLoad 传出的config 是一个路径，就是config文件夹，
    //  */
    // public static async loadConfig(path: string) {
    //     if (path.endsWith('/')) {
    //         path.replace(/\/$/, '');
    //     }

    //     const names = Fs.readdirSync(path);
    //     for (const name of names) {

    //     }
    // }

    public static async createFile(src: string, dist: string) {
        try {
            child_process.spawn('cp', ['r', src, dist]);

            return true;
        }
        catch (err) {
            console.log(err);
        }
    }

}



