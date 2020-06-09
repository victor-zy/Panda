import { ControllerTransformer } from './core/ControllerTransformer';
import 'reflect-metadata';
// import koa from 'koa';
import { Application } from './Application';



const app = new Application();

app
    .start();

export * from './Application';

export * from './core';

export * from './lifecycle';
