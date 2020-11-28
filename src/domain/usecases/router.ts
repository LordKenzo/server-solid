import { Handler } from "@/domain/usecases/Handler";
import "reflect-metadata";

export namespace HttpRouter {
  
  export type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS';
  
  export interface Route {
    verb:HttpRouter.HttpVerbs
    endpoint: string
    handler: Handler | Handler[]
  }

  type Constructor<T> = new (...args: any[]) => T;


  export function Router(router: Route[]){
    return <T>(target: Constructor<T>) => {
      Reflect.defineMetadata('routes', router, target);
    };
  }

}

export interface HttpRouter {
  routes: HttpRouter.Route[]
}