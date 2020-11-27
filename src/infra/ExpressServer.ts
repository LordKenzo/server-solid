import express, { Request, Response, Router } from 'express';
import { Server as NodeServer } from "http";
import { Server } from '@/domain/usecases/server';
import { HttpRouter } from '@/domain/usecases/router';
import { Handler } from '@/domain/usecases/Handler';


@HttpRouter.Router([
  {
    verb: 'GET',
    endpoint: '/',
    handler: new Handler(),
  },
  {
    verb: 'GET',
    endpoint: '/hello',
    handler: new Handler(),
  },
  {
    verb: 'POST',
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

  async listen(request: Server.HandlerRequest) {
    const app = express();
    // app.use('/', (req, res) => request.handle(req, res));
    let expressRouter = express.Router();
    app.use('/',this.buildRoutes(expressRouter));
    this.server = app.listen(this.port, async () => await console.log(`Express Server listening on ${this.port}`));

  }

  async close() {
    this.server.close();
  }

  private buildRoutes(expressRouter: Router) {
    const getRequest = this.router.routes.filter((route: any) => route.verb === 'GET');
    const postRequest = this.router.routes.filter((route: any) => route.verb === 'POST');
    getRequest.forEach(route => expressRouter.get(route.endpoint, (req:Request, res: Response) => {
      res.send(route.handler.handle(req, res));
    }));
    postRequest.forEach(route => expressRouter.post(route.endpoint, async (req:Request, res: Response) => {
      try {
        res.send(await route.handler.handle(req, res));
      } catch(err) {
        res.send(err);
      }
     
    }));
    return expressRouter;
  }

}