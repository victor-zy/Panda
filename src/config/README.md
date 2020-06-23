## config文件夹目录介绍

### ConfigContainer.ts

主要用于config的注册，主要是将config文件夹下的default.json文件进行合并；

### default.js

在这里。我使用的是 `.js` 格式的配置文件
***配置文件大概是这样*** ：
``` JavaScript
var config = {

    // 当这个debug为true的时候，说明处于本地调试
    debug: true,
    name: 'panda',
    port: '3001',
    secret: 'secret',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, '../../log/panda.log'),
    mongoDB: {
        username: 'root',
        database: 'mall',
        password: 'root',
        host: '127.0.0.1',
        port: 27017
    }

}

moudle.exports = config;
```

### Usage
在程序启动的时候，使用require（）来载入此文件，得到一个对象，通过此对象的属性来读取对应的配置信息。
