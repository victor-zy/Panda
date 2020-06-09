# Controller
所有的控制器都是由 Controller 装饰器注解声明的，只有带有 Controller 注解的类，才具有控制器的能力。


## 如何编写 Controller
装饰器 Controller 是一个带参的装饰器。

- Controller([baseUri = ''])

Controller 的第一个参数是 baseUri, 代表这个 Controller 类底下的路由方法的默认路由前缀。
```ts
// base.ts
import { Controller } from 'panda';

@Controller('/base')
export class Base {

}
```

## 路由注册
目前支持的路由注册方法有八种：
- Post
- Delete
- Put
- Get
- Patch
- Options
- All
- Head

```ts
// example
import { Controller, Get } from 'panda';

@Controller('/base')
export class Base {
    @Get('')
    index(ctx) {
        ctx.body = 'hello, panda';
    }
}
```

## 注意事项
- 每一个通过 Controller 装饰器注解的控制器类，都是具有独立命名空间的 router 管理，后续考虑可对该 router 进行定制化控制
- 目前没有做文件夹自动加载的约定能力，所以还需要手动 export Controller， 在入口文件 import 该文件来使生命生效
- 虽然一个文件内可以通过生命多个 Controller 装饰器来注册多个路由控制器，但通常我们建议一个文件只书写一个控制器
