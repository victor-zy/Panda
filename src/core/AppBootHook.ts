// import { ConfigContainer } from './../config/ConfigContainer';
// export class AppBootHook {
// // 变量

//     private appConfig: string;

//     // 配置文件夹
//     private _configDir: string;

//     // 配置管理器
//     public _configs: typeof ConfigContainer;

//     // 设置configWillLoad和configdidLoad的状态值
//     public readonly statusId:  number = 0 ;
    


// // 方法
//     get configDir(): string {
//         return this._configDir;
//     }

//     public async configWillLoad(){
//         const configDir: string  = this.configDir;
//         await ConfigContainer.registerConfig(configDir);

//         this._configs = ConfigContainer;
       
//         await this.beforeReady();

//         if (this.statusId === 0) {
//             'configWillLoad' in this ? await (this as any).configWillLoad() : null;
//         }
//     }


//     static beforeReady() {
//         throw new Error("Method not implemented.");
//     }

//     private async configdidLoad(path: string) {

//     }

//     private async pluginWillLoad() {

//     }

//     private async pluginDidLoad() {

//     }

//     private async beforeReady() {

//     }

//     private async ready() {

//     }

//     private async afterReady() {

//     }

//     private async beforeClose() {

//     }

// }




这个想法先暂时待定!!!!!!!
没有注释的原因是别忘记这个想法