import { ControllerRegistry } from './../ControllerRegistry';

/**
 * @author tiege
 * @email tiege@gaoding.com
 * @description 路由注册装饰
 * @param target any
 * @param actionName string 
 * @param method string
 * @param route string | RegExp
 */

 function registryHelper(target: any, actionName: string, method: string, route: string | RegExp) {
     return ControllerRegistry.registerAction(target.constructor, actionName, method, route);
 }


/**
 * @description get 路由器 
 * @param route string | RegExp
 */
export function Get(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'get', route);
    }
}

/**
 * @description Put 路由器
 * @param route 
 */
export function Put(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'put', route);
    }
}

/**
 * @description get 路由器 
 * @param route string | RegExp
 */
export function Patch(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'patch', route);
    }
}

/**
 * @description delete 路由注册
 * @param route string | RegExp
 */
export function Delete(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'delete', route);
    }
}

/**
 * @description option 路由注册
 * @param route string | RegExp
 */
export function Options(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'options', route);
    }
}

/**
 * @description all 路由注册
 * @param route string | RegExp
 */
export function All(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'all', route);
    }
}

/**
 * @description head 路由注册
 * @param route string | RegExp
 */
export function Head(route: string | RegExp){
    return function(target: any, actionName: string) {
        registryHelper(target, actionName, 'head', route);
    }
}


