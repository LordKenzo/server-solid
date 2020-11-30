import { Handler } from "@/domain/usecases/handler";
import "reflect-metadata";
import { HTTPValues } from "../common/httpCommonValues";

export namespace HttpRouter {
  
  export interface Route {
    verb: HTTPValues.HTTP_VERBS
    endpoint: string
    handler: Handler.HandlerRequest | Handler.HandlerRequest[] | any
  }

  type Constructor<T> = new (...args: any[]) => T;

  export function RoutingTable(router: Route[]){
    return <T>(target: Constructor<T>) => {
      Reflect.defineMetadata('routes', router, target);
    };
  }

  export interface RoutingTable {
    [index: string]: {
      verb: HTTPValues.HTTP_VERBS,
      handler: Handler.HandlerRequest| Handler.HandlerRequest[],
    }
  }

}

export interface HttpRouter {
  routes: HttpRouter.Route[]
}