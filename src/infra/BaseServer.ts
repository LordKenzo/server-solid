import { HTTPValues } from "@/domain/common/httpCommonValues";
import { Handler } from "@/domain/usecases/Handler";
import { Server } from "@/domain/usecases/server";

interface RoutingTable {
  [index: string]: {
    verb: HTTPValues.HTTP_VERBS,
    handler: Handler| Handler[],
  }
}

export abstract class BaseServer implements Server.HttpServer {
  abstract port: number;
  abstract listen(): void;
  abstract close(): void;
  protected routingTable: RoutingTable | null= null;
  async processRequest(endpoint: string, route: any, req: any, res: any) {
    //this.processRequest(path, this.routingTable && this.routingTable[path], req, res)
    if(route && Array.isArray(route.handler) && route.verb === req.method) {
      const result = await route.handler.reduce(async (prev: any,handler: any) => {
        return await handler.handle(req, res, prev);
      }, {});
      
      res.writeHead(HTTPValues.HTTP_STATUS_CODES.OK, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result));
      res.end();
    } else if(route && !Array.isArray(route.handler) && route.verb === req.method){
      const result = await route.handler.handle(req, res);
      res.writeHead(HTTPValues.HTTP_STATUS_CODES.OK, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result));
      res.end();
    } else if(route && route.verb !== req.method){ 
      this.verbNotFound(res, endpoint);
    }else {
      this.resourceNotFound(res, endpoint);
    }
  }

  protected resourceNotFound(res: any, endpoint: string){
    console.log('ROUTE NOT FOUND!!!');
    res.writeHead(HTTPValues.HTTP_STATUS_CODES.NOT_FOUND, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify({err: 'Resource Not Found', message: `${endpoint} You resource is not here!!!`}));
    res.end();
  }

  protected verbNotFound(res: any, endpoint: string){
    console.log('VERB NOT FOUND!!!');
    res.writeHead(HTTPValues.HTTP_STATUS_CODES.BAD_REQUEST, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify({err: 'Verb Not Found', message: `${endpoint} You resource is not here!!!`}));
    res.end();
  }

  protected buildRoutes(router: any): RoutingTable {
    return router.routes.reduce((prev: any, route: any) => {
      return {
        ...prev,
        [route.endpoint.replace(/^\/|\/$/g, '')]: {  
          verb: route.verb,
          handler: route.handler
        }
      }
    }, {})
  }
}