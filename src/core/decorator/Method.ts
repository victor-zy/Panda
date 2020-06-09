/**
 * @author tunan
 * @email tunan@gaoding.com
 * @create date 2019-06-10 23:40:51
 * @modify date 2019-06-10 23:40:51
 * @desc 路由注册装饰器，注解的方式注入路由注册表
 */
import { ControllerRegistry } from '../ControllerRegistry';

// get 路由注册
export function Get(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'get', route);
    };
}

// post 路由注册
export function Post(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'post', route);
    };
}

// put 路由注册
export function Put(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'put', route);
    };
}

// patch 路由注册
export function Patch(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'patch', route);
    };
}

// delete 路由注册
export function Delete(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'delete', route);
    };
}

// options 路由注册
export function Options(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'options', route);
    };
}

// all 路由注册
export function All(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'all', route);
    };
}

// head 路由注册
export function Head(route: string | RegExp) {
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'head', route);
    };
}


function registryHelper(target: any, actionName: string, method: string, route: string | RegExp) {
    return ControllerRegistry.registerAction(target.constructor, actionName, method, route);
}
