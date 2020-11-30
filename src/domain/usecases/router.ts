import { Handler } from "@/domain/usecases/handler";
import "reflect-metadata";
import { Server } from "./server";

export namespace HttpRouter {
  
  export interface Route {
    verb: Server.HTTP_VERBS
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
      verb: Server.HTTP_VERBS,
      handler: Handler.HandlerRequest| Handler.HandlerRequest[],
    }
  }

}

export interface HttpRouter {
  routes: HttpRouter.Route[]
}