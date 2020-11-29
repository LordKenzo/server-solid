import { Handler } from "@/domain/usecases/Handler";
import "reflect-metadata";
import { HTTPValues } from "../common/httpCommonValues";

export namespace HttpRouter {
  
  export interface Route {
    verb: HTTPValues.HTTP_VERBS
    endpoint: string
    handler: Handler | Handler[] | any
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