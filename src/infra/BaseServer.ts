import { HttpRouter } from "@/domain/usecases/router";
import { Server } from "@/domain/usecases/server";

export abstract class BaseServer implements Server.HttpServer {
  
  protected routingTable: HttpRouter.RoutingTable | null= null;

  abstract port: number;
  abstract listen(): void;
  abstract close(): void;

  async processRequest(endpoint: string, route: any, req: any, res: any) {
    try {

      if(route && Array.isArray(route.handler) && route.verb === req.method) {
        console.log('ROUTE CON PIU\' HANDLER!!!');
        const result = await route.handler.reduce(async (prev: any,handler: any) => {
              const result = await handler.handle(req, res, prev).catch( (err:any) => {
                throw err;
              })
              return result;
        }, {});
        
        await res.writeHead(Server.HTTP_STATUS_CODES.OK, {'Content-Type': 'text/plain'});
        await res.write(JSON.stringify(result));
        await res.end();
        
      } else if(route && !Array.isArray(route.handler) && route.verb === req.method){
        console.log('ROUTE CON UN SOLO HANDLER!');
        const result = await route.handler.handle(req, res);
        res.writeHead(Server.HTTP_STATUS_CODES.OK, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result));
        res.end();
      } else if(route && route.verb !== req.method){ 
        this.verbNotFound(res, endpoint);
      }else {
        this.resourceNotFound(res, endpoint);
      }
    } catch(error) {
      res.writeHead(error.err.status, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify({err: {message: error.err.detail, title: error.err.title}}));
      res.end();
    } 
  }

  protected resourceNotFound(res: any, endpoint: string){
    console.log('ROUTE NOT FOUND!!!');
    res.writeHead(Server.HTTP_STATUS_CODES.NOT_FOUND, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify({err: { status: Server.HTTP_STATUS_CODES.NOT_FOUND, title: 'Resource Not Found', message: `${endpoint} You resource is not here!!!`}}));
    res.end();
  }

  protected verbNotFound(res: any, endpoint: string){
    console.log('VERB NOT FOUND!!!');
    res.writeHead(Server.HTTP_STATUS_CODES.BAD_REQUEST, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify({err: { status: Server.HTTP_STATUS_CODES.BAD_REQUEST, title: 'Verb Not Found', message: `${endpoint} You resource is not here!!!`}}));
    res.end();
  }

  protected buildRoutes(router: HttpRouter): HttpRouter.RoutingTable {
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