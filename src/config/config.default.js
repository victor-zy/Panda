'use strict'

const path = require('path');

var config = {
    // 当这个debug为true的时候，说明处于本地调试
    debug: true,
    name: 'panda',
    port: '7777',
    host: '127.0.0.1',
    secret: 'secret',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, '../../log/panda.log'),
    // 后面比如说数据库的配置信息
}

module.exports = config;