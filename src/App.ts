import { Server } from '@/domain/usecases/server';
import { HttpServer } from "@/infra/HttpServer";
import { ExpressHttpServer } from "@/infra/ExpressServer";
import { HttpRouter } from './domain/usecases/router';

export class App {
  constructor(private readonly server: Server) {}

  launch() {
    console.log("Launch App");
    this.server.start();
  }
}

export namespace App {
  export interface ServerFactory {
    createExpressServer(): Server;
    createConnectHttpServer(): Server;
  }
  
  export function createConnectHttpServer(): Server { 
    const router = Reflect.getMetadata('routes', HttpServer);
    const httpServer =  new HttpServer(8080, buildRoutes(router));
    const server = new Server(httpServer);
    return server;
  }

  export function createExpressServer(): Server {
    const router = Reflect.getMetadata('routes', ExpressHttpServer);
    const expressServer =  new ExpressHttpServer(8080, buildRoutes(router));
    const server = new Server(expressServer);
    return server;
  }

  function buildRoutes(routes: HttpRouter.Route[]): HttpRouter {
    return { 
      routes: routes.map( ({verb, endpoint, handler}: HttpRouter.Route) => {
      return {
        verb,
        endpoint,
        handler
      }
    })
    }
  }
}