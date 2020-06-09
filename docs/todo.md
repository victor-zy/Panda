# Todo
顾名思义就是需要做的事情

## Plugin
插件，插件的目的是拓展或完善程序所需的能力，插件的设计应该是独立可插拔式的

## Extend
拓展，方便的方法补齐功能

## Lifecycle
生命周期，一个程序哥整个生命规划，由于程序的状态变化一般是在启动时具有多种状态，在运行时基本上保持不变，所以基本的生命周期调用都是在启动时的设计

初步规划生命周期为两个部分，应用生命周期(app-lifecycle)和插件生命周期(plugin-lifecycle)
- app-lifecycle
    - init() ***在项目根目录之下生成log,config文件夹和 plugin 文件夹,加载应用级别的中间件***
    - configWillLoad() **完成** 生成配置加载的路径，为configdidload传入参数
    - configdidLoad(appConfig) **完成** 根据configWillLoad生成的appConfig生成默认的配置文件，完成配置的修改加载
    - *pluginWillLoad **完成** 解析生成的插件配置文件夹，为之后的pluginDid传入参数
    - *pluginDidLoad **完成** 根据其beforeReady生成的路径，生成默认的plugin.default文件
    - beforeReady 留空 **完成**
    - ready 这个时候开始监听端口 **完成**
    - afterReady 留空
    - beforeClose 
- plugin-lifecycle 这个是最骚的，目前的 eggjs 就是没有这个，导致无法动态更改插件
    - init()
    - configWillLoad(config)
    - configDidLoad(config)
    - willUpdate(preConfig, nextConfig)

###

## Loader
加载器，主要用途是用来挂载属性或插件到目标对象上

loader 的设计啊应该是在应用启动时