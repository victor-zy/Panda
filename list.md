.
├── README.md
├── docs
│   ├── appointment.md
│   ├── design
│   │   ├── config.md
│   │   └── controller.md
│   ├── todo.md
│   └── usage
│       ├── application.md
│       ├── config.md
│       └── controller.md
├── list.md
├── package-lock.json
├── package.json
├── src  ***作为项目的根目录***
│   ├── Application.ts **这个位置就是我要写的位置**2
│   ├── ApplicationRegistry.ts   **3**
│   ├── SettingOptions.ts        **4**
│   ├── config
│   │   ├── ConfigContainer.ts
│   │   └── interface
│   │       └── IAppConfig.ts
│   ├── core    ***核心业务逻辑层***
│   │   ├── ControllerFilterMetadata.ts     **控制层元数据过滤**
│   │   ├── ControllerMetadata.ts
│   │   ├── ControllerRegistry.ts  **6**
│   │   ├── ControllerTransformer.ts
│   │   ├── FilterMetadata.ts   **元数据过滤**包含了处理元数据
│   │   ├── FilterOptions.ts    **操作过滤**
│   │   ├── HTTPMethodAndPath.ts **字符串**
│   │   ├── HandlerMetadata.ts  **处理元数据**//包含了处理解析元数据和HTTP方法和路径
│   │   ├── HandlerParamMetadata.ts ***处理元数据***
│   │   ├── HandlerParamOptions.ts ***一个布尔值和任意值的value***
│   │   ├── HandlerRegistry.ts
│   │   ├── Reflection.ts
│   │   ├── decorator   **修饰层**
│   │   │   ├── Controller.ts   **修饰层控制器**
│   │   │   └── Method.ts       **修饰层方法**
│   │   ├── enum
│   │   │   └── ParamType.ts
│   │   ├── index.ts
│   │   └── interface
│   │       └── IVoidFunction.ts
│   ├── di
│   │   └── AppLoader.ts
│   ├── index.ts    ***项目入口文件*** 1
│   ├── initializer
│   │   └── MiddlewareInitializer.ts    **5**
│   ├── lib
│   │   ├── ConvertUtil.ts
│   │   └── LodashUtil.ts
│   ├── lifecycle
│   │   ├── AppLifecycle.ts
│   │   ├── index.ts
│   │   └── interface
│   │       └── IAppLifecycle.ts
│   └── plugins
│       ├── README.md
│       └── Router.ts
├── test
│   ├── index.js
│   └── index.ts
└── tsconfig.json

17 directories, 46 files
