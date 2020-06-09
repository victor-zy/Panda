import { Application, Controller, Get, IAppLifeCycle } from '../src';
class App extends Application implements IAppLifeCycle {
    async init() {
        console.log('heiheihei');
    }
}

@Controller('')
class Base {
    @Get('/hello')
    index(ctx) {
        ctx.body = 'hello, panda. ' + this.getHello();
    }

    getHello() {
        return 'oh, i am panda';
    }
}

console.log(Base);

const app = new App();
app.start();
