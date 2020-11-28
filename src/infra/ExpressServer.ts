import express, { Request, Response, Router } from 'express';
import { Server as NodeServer } from "http";
import { Server } from '@/domain/usecases/server';
import { HttpRouter } from '@/domain/usecases/router';
import { Handler } from '@/domain/usecases/Handler';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { HTTPValues } from '@/domain/common/httpCommonValues';


@HttpRouter.Router([
  {
    verb: HTTPValues.HTTP_VERBS.GET,
    endpoint: '/',
    handler: new Handler(),
  },
  {
    verb: HTTPValues.HTTP_VERBS.GET,
    endpoint: '/hello',
    handler: [new Handler(), new HandlerCiao()]
  },
  {
    verb: HTTPValues.HTTP_VERBS.POST,
    endpoint: '/message',
    handler: new Handler(),
  },
])
export class ExpressHttpServer implements Server.HttpServer {
  private server: NodeServer;

  constructor(public port: number, public router: HttpRouter) {
    console.log('New Server Express');
    this.server = new NodeServer();
  }

  async listen() {
    const app = express();
    let expressRouter = express.Router();
    app.use('/',this.buildRoutes(expressRouter));
    this.server = app.listen(this.port, async () => await console.log(`Express Server listening on ${this.port}`));
  }

  async close() {
    this.server.close();
  }

  private buildRoutes(expressRouter: Router) {
    const getRequest = this.router.routes.filter((route: any) => route.verb === 'GET');
    // const postRequest = this.router.routes.filter((route: any) => route.verb === 'POST');
    console.log('build routes');
    getRequest.forEach(route => expressRouter.get(route.endpoint, (req:Request, res: Response) => {
      if(Array.isArray(route.handler)) {
        const result = route.handler.reduce((prev,handler) => {
          return handler.handle(req, res, prev);
        }, {});
        console.log('Tanti Handler');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result));
        res.end();
      } else {
        console.log('Un solo Handler');
        const result = route.handler.handle(req, res);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result));
        res.end();
      }
      
    }));

    /*postRequest.forEach(route => expressRouter.post(route.endpoint, async (req:Request, res: Response) => {
      try {
        res.send(await route.handler.handle(req, res));
      } catch(err) {
        res.send(err);
      }
    }));*/

    return expressRouter;
  }

}