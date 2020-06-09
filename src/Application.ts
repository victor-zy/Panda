import { PluginContainer } from './plugins/PluginContainer';
import { ApplifeCycle } from './lifecycle/AppLifecycle';
import * as http from 'http';
import * as Fs from 'fs';
import * as path from 'path';
import * as Koa from 'koa';
import * as child_process from 'child_process';
import { ApplicationRegistry } from './ApplicationRegistry';
import { ConfigContainer } from './config/ConfigContainer';
import { MiddlewreInitializer } from './initializer/MiddlewareInitializer';
import { Router } from './plugins/Router';
import { ControllerRegistry } from './core/ControllerRegistry';
import { IAppConfig } from './config/interface/IAppConfig';
import { IPluginConfig } from './config/interface/IPluginConfig';

export class Application {
    private _env: string;

    // 项目根目录，默认是 process.cwd()
    private _rootDir: string = process.cwd();

    // http-server 应用, koa底层
    private _server: http.Server;
    private _app: Koa;

    // 配置文件夹
    private _configDir: string;

    // 配置插件文件夹
    private _pluginDir: string;

    // 配置管理器
    private _configs: typeof ConfigContainer;

    // 插件配置管理器
    private _plugins: typeof PluginContainer;

    // private middleware: any [];

    private _appConfig: IAppConfig;
    private _pluginConfig: IPluginConfig;

    private _lifecycle: any = new ApplifeCycle()

    // 路由器
    private _router = Router;

    get configDir(): string {
        return this._configDir;
    }

    get pluginDir(): string {
        return this._pluginDir;
    }

    get appConfig(): any {
        return this._appConfig;
    }

    get pluginConfig(): any {
        return this._pluginConfig;
    }

    get env() {
        return this._env;
    }

    get rootDir() {
        return this._rootDir;
    }

    get server() {
        return this._server;
    }

    get configs() {
        return this._configs;
    }

    get koaApp() {
        return this._app;
    }

    get router() {
        return this._router;
    }

    async start() {
        await this._invokeApplicationInitHook();
        const main = _ctx => {
            _ctx.body = 'hello world';
        };
        this.use(main);
        this._ready();
        this._afterReady();
        this._beforeClose();
    }
    /**
     * 挂载回调函数
     * @param fn 回调函数处理
     */
    use(fn: any) {
        this._app.use(fn);
    }


    /**
     * @description create httpServer with koa
     * @author tunan
     * @private
     * @memberof Application
     */
    private _createServer() {
        this._app = new Koa();
        this._server = http.createServer(this._app.callback());
    }

    /**
     * @description 执行生命周期函数加载，并串行执行
     * @author tunan
     * @private
     * @memberof Application
     */
    private async _invokeApplicationInitHook() {
        // 初始化 http-server
        this._createServer();

        await this._init();
        await this._configWillLoad();
        await this._configdidLoad(this.appConfig);
        await this._pluginWillLoad();
        await this._pluginDidLoad(this.pluginConfig);
        // await this._ready();
        // await this._afterReady();
        this.loadRoutes();
    }

    /**
     * @description 执行插件生命周期函数加载
     * @author tiege
     * @private
     * @memberof Application
     */
    private async _invokePluginInitHook() {
        await this.init();
        await configWillLoad(config);
        await configDidLoad(config);
        await willUpdate(preConfig,nextConfig)
    }

    private async loadRoutes() {
        const routers = ControllerRegistry.getRoutes();

        routers.forEach(router => {
            this._app.use(router.routes())
                .use(router.allowedMethods());
        });
    }

    /**
     * @description 私有生命周期函数，初始化状态
     * @author tunan
     * @private
     * @memberof Application
     */
    private async _init() {
        const settings = ApplicationRegistry.settings;
        // console.log('_init 周期里面的A:', settings);

        // 初始化配置目录
        ['log', 'config', 'plugin'].map(item => {
            // console.log('A.1:',item);
            this[`_${item}Dir`] = settings[`${item}Dir`] || `${this._rootDir}/${item}`;
            // console.log('A.2:',this[`_${item}Dir`])
            // 目录不存在则创建目录
            if (!Fs.existsSync(this[`_${item}Dir`]) && this._env !== 'test') {
                Fs.mkdirSync(this[`_${item}Dir`]);
            }
        });

        // 加载默认 middlewares
        MiddlewreInitializer.init(this);
        // console.log('A.1:', arr);

        // 执行 app init 方法
        'init' in this ? await (this as any).init() : null;
    }

    /**
     * @function app-lifeCycle/configWillLoad
     */
    private async _configWillLoad() {
        const configDir: string = this.configDir;
        await ConfigContainer.registerConfig(configDir);

        this._configs = ConfigContainer;
        await this._beforeReady();// 对于应用而言，我们应该写在在loading过程中调用，所有方法并行执行，用来检测连接状态

        // 执行 app configWillLoad 生命周期方法
        'configWillLoad' in this ? await (this as any).configWillLoad() : null;
    }

    /**
     * @function app-lifeCycle/pluginWillLoad
     * @param null
     */
    private async _pluginWillLoad() {
        const pluginDir: string = this.pluginDir;
        await PluginContainer.registerPlugin(pluginDir);

        this._plugins = PluginContainer;

        'pluginWillLoad' in this ? await (this as any).pluginWillLoad() : null;
    }

    private async _configdidLoad(appConfig: string) {
        // 所有配置已经加载完毕
        appConfig = this._configs._configRoot;
        // let dist:string = appConfig + '/config.default';
        // console.log('dist:', dist);
        let load_status: boolean = this.createFile('./config.default', appConfig);
        if (load_status) {
            console.log('_configDidLoad success');
        }
        // console.log('生成appconfig配置:'+ appConfig);
        // 可以用来加载应用自定义的文件，启动自定义的服务
    }

    private _pluginDidLoad(pluginConfig: string) {
        pluginConfig = this._plugins._pluginRoot;

        let load_status: boolean = this.createFile('./plugin.default', pluginConfig);
        if (load_status) {
            console.log('_pluginDidLoad success');
        }

    }

    /**
     * @description _beforeReady在此基础框架中留空，之后如果需要有db的连接再自行定义方法
     */
    private async _beforeReady() {
        console.log('_beforeReady：检查数据库的连接或者其他外部连接的状态')
    }

    private async _ready() {
        console.log('Application server starting ^.^');
        this.server.listen(ConfigContainer.get('app.server.port') || 7777);
        // console.log('_ready,HttpServer 的监听这个时候开始');
    }

    private async _afterReady() {
        console.log('server run at the : localhost:7777');
        // this.server.listen(7777);
        // this.server.removeListener(7777);
        // console.log('_afterReady: 留空');
    }

    private async _beforeClose() {
        this.server.close();
    }

    /**
     * @description plugin-lifeCycle 的初始化函数
     * @author 铁歌
     */
    private async init() {

    }
    private async createFile(src: string, dist: string) {
        try {
            child_process.spawn('cp', ['r', src, dist]);

            return true;
        }
        catch (error) {
            console.log(error);
        }
    }


}
