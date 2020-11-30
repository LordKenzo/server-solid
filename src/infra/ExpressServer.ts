import express, { Request, Response } from 'express';
import { Server as NodeServer } from "http";
import { HttpRouter } from '@/domain/usecases/router';
import { HandlerProva } from '@/domain/usecases/HandlerProva';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { BaseServer } from './BaseServer';
import { HandlerMessage } from '@/domain/usecases/HandlerMessage';
import { AxiosAdapter } from './AxiosAdapter';
import { HandlerAuth } from '@/domain/usecases/HandlerAuth';
import { Server } from '@/domain/usecases/server';

@HttpRouter.RoutingTable([
  {
    verb: Server.HTTP_VERBS.GET,
    endpoint: '/',
    handler: new HandlerProva(),
  },
  {
    verb: Server.HTTP_VERBS.GET,
    endpoint: '/hello',
    handler: [new HandlerProva(), new HandlerCiao()]
  },
  {
    verb: Server.HTTP_VERBS.POST,
    endpoint: '/message',
    handler: [new HandlerAuth(new AxiosAdapter()), new HandlerMessage(new AxiosAdapter())],
  },
])
export class ExpressHttpServer extends BaseServer {
  private server: NodeServer;

  constructor(public port: number, public router: HttpRouter) {
    super();
    console.log('New Server Express');
    this.server = new NodeServer();
  }

  async listen() {
    const app = express();
    this.routingTable = this.buildRoutes(this.router);
    
    app.use('/', (req, res) => {
      const path = req.path.replace(/^\/|\/$/g, '');
      this.processRequest(path, this.routingTable && this.routingTable[path], req, res)
    });
    this.server = app.listen(this.port, async () => await console.log(`Express Server listening on ${this.port}`));
  }

  async close() {
    this.server.close();
  }

}