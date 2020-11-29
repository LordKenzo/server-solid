import express, { Request, Response } from 'express';
import { Server as NodeServer } from "http";
import { HttpRouter } from '@/domain/usecases/router';
import { Handler } from '@/domain/usecases/Handler';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { HTTPValues } from '@/domain/common/httpCommonValues';
import { BaseServer } from './BaseServer';
import { HandlerMessage } from '@/domain/usecases/HandlerMessage';

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
    handler: [new HandlerMessage()],
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