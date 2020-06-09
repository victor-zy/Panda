# Config 类的设计文档
配置是一个框架的基础，框架的初始化和运行都依赖于配置内容，后续的插件更新也依赖于配置的变更

## Config 加载
配置应该尽可能的纯净，减少业务逻辑的参与

动态 js 语言可以在代码中插入配置。

### config 文件
配置文件统一放在 ${project}/configs 文件夹底下：
- 文件命名，统一 xxx.js 作为配置文件命名
- 可以独立文件夹配置分类， configs/${folder}/${filename}.js
- 文件导出一个对象作为该文件管理的配置内容，如果 exports 是一个 function，那么function 执行后 return 的对象会是该文件管理的配置内容

### config 读取
- 会根据 configs 文件夹底下的文件结构进行配置提取
- 如果是多文件夹嵌套的 configs/${folder1}/${folder2}/${filename}.js, 挂载的配置会是 configs.get('${folder1}/${folder2}/${filename}.xxx')

### loader
- app 获取配置，可以在 app.configs 中获取需要的配置，如 app.configs.get('database.host')
- ctx 获取配置，可以在 ctx.app.configs 中获取需要的配置，获取方式如上
