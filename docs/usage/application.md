# Application
Application 是全局应用对象，一个应用中只会初始化一个 app，它包装自 Koa.Application. 在框架中，我们可以对它进行能力拓展

## 如何编写 Application
Application 是一个基类，我们可以通过 new Application() 来生成全局 app，也可以通过继承 Application 来拓展 app。

全局默认启动端口 7777;
```ts
import { Application } from 'panda';

new Application().start();
```

可以通过继承 Application 来拓展生命周期函数
```ts
import { Application, IAppLifeCycle } from 'panda';

class App extends Application implements IAppLifeCycle {
    init() {
        console.log('hi, i am init lifecycle function');
    }
}

new App().start();
```

## 配合 Controller
- 请参考 <a href='./controller.md'>Controller 文档</a>
```ts
import { Application, IAppLifeCycle } from 'panda';
import 'path_for_controller_file';

class App extends Application implements IAppLifeCycle {
    init() {
        console.log('hi, i am init lifecycle function');
    }
}

new App().start();
```
