# Controller

## Controller Registry
提供基类 Controller,

注册 controller，一个类继承 Controller 后，记录当前 controller 的所有方法和元数据。controller 在实例化的时候加载 router 装饰器的方法到路由中去。

## Controller Type
controller 分为一般 controller 和 restController
- Controller 装饰器的类，可以配置自由的路由加载
- RestController 装饰器的类，自动加载 curd 的路由器，其他路由注册完全支持 Controller

## 类方法调用