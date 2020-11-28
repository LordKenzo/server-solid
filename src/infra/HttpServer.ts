import { HTTPValues } from '@/domain/common/httpCommonValues';
import { Handler } from '@/domain/usecases/Handler';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { HttpRouter } from '@/domain/usecases/router';
import { Server } from '@/domain/usecases/server';
import { Utils } from '@/utils/Utils';
import { createServer, IncomingMessage, Server as NodeServer, ServerResponse} from "http";

interface RoutingTable {
    [index: string]: {
      verb: HTTPValues.HTTP_VERBS,
      handler: Handler| Handler[],
    }
}

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
export class HttpServer implements Server.HttpServer {
  
  private routingTable: RoutingTable | null= null;

  private server: NodeServer;
  
  constructor(public port: number, public router: HttpRouter) {
    this.server = new NodeServer();
    this.routingTable = this.buildRoutes();
    console.log(this.routingTable);
  }

  async listen() {
    this.server = createServer((req, res) => {
      this.processRequest(req, res);
    }).listen(this.port, async () => await console.log(`Http Server listening on ${this.port}`))
  }

  async close() {
    this.server.close();
  }

  private buildRoutes(): RoutingTable {
    return this.router.routes.reduce((prev, route) => {
      return {
        ...prev,
        [route.endpoint]: {  
          verb: route.verb,
          handler: route.handler
        }
      }
    }, {})
  }

  private async processRequest(req: IncomingMessage, res: ServerResponse) {
    const endpoint = Utils.getBasePath(req);
    const getRequest = this.router.routes.filter((route: any) => route.verb === 'GET');
  }
  
  private async getBody<T>(req: any): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (data: string) => {
        body += data;
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', (err: any) => {
        reject(err)
      });
    });
  }

}