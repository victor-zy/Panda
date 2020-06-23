import * as http from 'http';
import * as Fs from 'fs';

import { ControllerRegistry } from './core/ControllerRegistry';
// import { AppBootHook } from './core/AppBootHook';
import { Router } from './plugins/Router';
import { MiddlewareInitializer } from './initializer/MiddlewareInitializer';
import { ConfigContainer } from './config/ConfigContainer';
import * as Koa from 'koa';
import { ApplicationRegistry } from './ApplicationRegistry';
import * as path from 'path';

export class Application {
    // 变量
    private _env: string;

    private _rootDir: string = process.cwd();

    private _server: http.Server;
    private _app: Koa;

    //配置文件夹
    private _configDir: string;

    // 配置管理器
    private _configs: typeof ConfigContainer;

    //路由器
    private _router = Router;

    // 设置configWillLoad和configdidLoad的状态值
    // private readonly statusId:  number = 0 ;

    // 配置路径

    private _appConfig: string;


    // 方法
    get server() {
        return this._server;
    }

    get koaApp() {
        return this._app;
    }

    get configDir(): string {
        return this._configDir;
    }

    get appConfig(): string {
        return this._appConfig;
    }

    get router() {
        return this._router;
    }

    /**
     * @description framework start 
     * @author tiege 
     * @private
     * 
     */
    async start() {
        await this._invokeApplicationInitHook();
    }
    /**
     * framework 挂载点
     * @param fn 回调函数处理
     */
    use(fn: any) {
        this._app.use(fn);
    }

    /**
     * @description create httpServer with Koa 
     * @author tiege 
     * @private
     */
    private _createServer() {
        this._app = new Koa();
        this._server = http.createServer(this._app.callback());
    }

    /**
     * @description 执行生命周期函数并加载，串行执行
     * @memberof Application
     */
    private async _invokeApplicationInitHook() {
        // 初始化HTTP服务
        this._createServer();
        await this._init();
        // await AppBootHook.configWillLoad();
        await this._configWillLoad();
        await this._configdidLoad(this.appConfig);
        await this.pluginWillLoad();
        await this.pluginDidLoad();
        this.loadRoutes();

    }

    private async loadRoutes() {
        const routers = ControllerRegistry.getRoutes();

        routers.forEach(router => {
            this._app.use(router.routes())
                .use(router.allowedMethods());
        });
    }

    /**
     * @description 生命周期函数初始化
     * 
     */
    private async _init() {
        const settings = ApplicationRegistry.settings;
        ['log', 'config'].map(item => {
            // console.info(item);
            this[`_${item}Dir`] = settings[`${item}Dir`] || `${this._rootDir}/${item}`;

            if (!Fs.existsSync(this[`_${item}Dir`]) && this._env !== 'test') {
                Fs.mkdirSync(this[`_${item}Dir`]);
            }
        });

        MiddlewareInitializer.init(this);

        'init' in this ? await (this as any).init() : null;
    }

    /**
     * @description 配置即将加载，这是修改配置的最后时机;在这里，注册是第二步，第一步我
     * 想让它将src文件夹下面的config文件夹，并且将default.js文件内容拷贝到根目录下的config文件夹
     */
    private async _configWillLoad() {
        const configDir: string = this.configDir;
        console.log('configDir: ' + configDir)
        // await ConfigContainer.createFile('./config.default.js',configDir);
        await ConfigContainer.registerConfig(configDir);

        this._configs = ConfigContainer;

        'configWillLoad' in this ? await (this as any).configWillLoad() : null;
    }

    /**
     * @description 加载配置
     * @param path 
     */
    private async _configdidLoad(path: string) {
        const appConfig = this._configs._configRoot;
        console.log('这是appConfig：', appConfig);
        const config = require(appConfig + '/config.local.js');

        if (config.debug) {
            // await this.beforeReady();
            console.log('本地测试端口：', config.port)

        }
        // console.log(this.statusIds,appConfig);
        'configdidLoad' in this ? await (this as any).configdidLoad() : null;
    }

    /**
     * @description 本地默认插件即将加载
     */
    private async pluginWillLoad() {

        const pluginDir = path.join(__dirname, 'plugins');
        console.log('pluginDir: ', pluginDir);
        const names = Fs.readdirSync(pluginDir);
        for (const name of names) {
            const p = path.resolve(pluginDir, name);
            const stat = Fs.statSync(p);
            // console.log(stat);
            if (name.endsWith('.json')) {
                try {
                    const plugin = require(p);
                    console.info(plugin);  
                }
                catch (err) {
                    console.log(`[TYPED] [ERR] ${path} load error`);
                }
            }
        }

    
    }

    /**
     * @description 本地插件加载,
     */
    private async pluginDidLoad() {
    //    this._app.


    }

    /**
     * @description 监听http端口
     */
    private async ready() {
        // const config = require(this._configs._configRoot+'/config.local.js');
        // console.log(config)
        console.log("Application Server starting now  ^_^ ^_^");
        // this.server.listen(()=>{
        //     try {
        //         ConfigContainer.get('app.server.port' || config.port)
        //     } catch (err) {
        //         console.info(err);
        //     }
        // });

        const config = require(this._configs._configRoot + '/config.local.js');
        this.server.listen(ConfigContainer.get('app.server.port') || config.port);
    }

    /**
     * @description 在loading过程中调用
     */
    private async beforeReady() {
        await this.ready();
        console.log('my client is ready');
    }

}


// import * as http from 'http';
// import * as Fs from 'fs';

// import * as Koa from 'koa';
// import { ApplicationRegistry } from './ApplicationRegistry';
// import { ConfigContainer } from './config/ConfigContainer';
// import { MiddlewareInitializer } from './initializer/MiddlewareInitializer';
// import { Router } from './plugins/Router';
// import { ControllerRegistry } from './core/ControllerRegistry';

// export class Application {
//     // 变量
//     private _env: string;

//     // 项目根目录，默认是 process.cwd()
//     private _rootDir: string = process.cwd();

//     // http-server 应用, koa底层
//     private _server: http.Server;
//     private _app: Koa;

//     //配置文件夹
//     private _configDir: string;

//     // 配置管理器
//     private _configs: typeof ConfigContainer;

//     //路由器
//     private _router = Router;

//     get configDir(): string {
//         return this._configDir;
//     }

//     get env() {
//         return this._env;
//     }

//     get rootDir() {
//         return this._rootDir;
//     }

//     get server() {
//         return this._server;
//     }

//     get configs() {
//         return this._configs;
//     }

//     get koaApp() {
//         return this._app;
//     }

//     get router() {
//         return this._router;
//     }

//     /**
//      * @description framework start 
//      * @author tiege 
//      * @private
//      * 
//      */
//     async start(){
//         await this._invokeApplicationInitHook();

//         this.server.listen(ConfigContainer.get('app.server.port') || 7777);
//     }

//     use(fn: any) {
//         this._app.use(fn);
//     }

//     /**
//      * @description create httpServer with koa
//      * @author tunan
//      * @private
//      * @memberof Application
//      */
//     private _createServer() {
//         this._app = new Koa();
//         this._server = http.createServer(this._app.callback());
//     }

//     /**
//      * @description 执行生命周期函数加载，并串行执行
//      * @author tunan
//      * @private
//      * @memberof Application
//      */
//     private async _invokeApplicationInitHook() {
//         // 初始化 http-server
//         this._createServer();
//         await this._init();
//         // await AppBootHook.configWillLoad();
//         await this._configWillLoad();
//         // await this._configdidLoad()
//         this.loadRoutes();

//     }

//     private async loadRoutes() {
//         const routers = ControllerRegistry.getRoutes();

//         routers.forEach(router => {
//             this._app.use(router.routes())
//                      .use(router.allowedMethods());
//         });
//     }

//     /**
//      * @description 私有生命周期函数，初始化状态
//      * @author tunan
//      * @private
//      * @memberof Application
//      */
//     private async _init() {
//         const settings = ApplicationRegistry.settings;

//         // 初始化配置目录
//         ['log', 'config'].map(item => {
//             this[`_${item}Dir`] = settings[`${item}Dir`] || `${this._rootDir}/${item}`;

//             // 目录不存在则创建目录
//             if (!Fs.existsSync(this[`_${item}Dir`]) && this._env !== 'test') {
//                 Fs.mkdirSync(this[`_${item}Dir`]);
//             }
//         });

//         // 加载默认 middlewares
//         MiddlewareInitializer.init(this);

//         // 执行 app init 方法
//         'init' in this ? await (this as any).init() : null;
//     }


//     private async _configWillLoad() {
//         const configDir: string = this.configDir;
//         await ConfigContainer.registerConfig(configDir);

//         this._configs = ConfigContainer;

//         // 执行插件 configWillLoad 生命周期, 暂时没有定义这个私有方法
//         // this._loadPluginConfigWillLoad();

//         // 执行 app configWillLoad 生命周期方法
//         'configWillLoad' in this ? await (this as any).configWillLoad() : null;
//     }

//     /**
//      * @description 加载配置
//      * @param path 
//      */
//     private async _configdidLoad(path: string) {
//         const appConfig = this._configs._configRoot;
//         console.log('这是appConfig：',appConfig);
//         const config = require(appConfig+'/config.local.js');

//         if(config.debug) {
//             await this.beforeReady();
//             console.log('本地测试端口：',config.port)

//         }

//         // console.log(this.statusIds,appConfig);
//         'configdidLoad' in this ? await (this as any).configdidLoad() : null;
//     }

//     /**
//      * @description 监听http端口
//      */
//     private async ready() {
//         const config = require(this._configs._configRoot+'/config.local.js');
//         console.log("Application Server starting now  ^_^ ^_^");
//         this.server.listen(ConfigContainer.get('app.server.port' || config.port));
//     }

//     /**
//      * @description 在loading过程中调用
//      */
//     private async beforeReady(){
//         await this.ready();
//         console.log('my client is ready');
//     }

// }