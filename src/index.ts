import 'reflect-metadata';
import { Application } from './Application';


export * from './Application';

export * from './core';

export * from './lifecycle';

const app = new Application();
const main = ctx => {
    ctx.body = 'hello panda mvc';
}
app.start();

app.use(main);
// app.use(main);

