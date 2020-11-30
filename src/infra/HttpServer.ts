import { HTTPValues } from '@/domain/common/httpCommonValues';
import { HandlerProva } from '@/domain/usecases/HandlerProva';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { HandlerMessage } from '@/domain/usecases/HandlerMessage';
import { HttpRouter } from '@/domain/usecases/router';
import { Utils } from '@/utils/Utils';
import { createServer, Server as NodeServer} from "http";
import { AxiosAdapter } from './AxiosAdapter';
import { BaseServer } from './BaseServer';
import { HandlerAuth } from '@/domain/usecases/HandlerAuth';

@HttpRouter.RoutingTable([
  {
    verb: HTTPValues.HTTP_VERBS.GET,
    endpoint: '/',
    handler: new HandlerProva(),
  },
  {
    verb: HTTPValues.HTTP_VERBS.GET,
    endpoint: '/hello',
    handler: [new HandlerProva(), new HandlerCiao()]
  },
  {
    verb: HTTPValues.HTTP_VERBS.POST,
    endpoint: '/message',
    handler: [new HandlerAuth(new AxiosAdapter()), new HandlerMessage(new AxiosAdapter())],
  },
])
export class HttpServer extends BaseServer {
  
  private server: NodeServer;
  
  constructor(public port: number, public router: HttpRouter) {
    super();
    this.server = new NodeServer();
    this.routingTable = this.buildRoutes(this.router);
  }

  async listen() {
    this.server = createServer((req, res) => {
      const path = Utils.getBasePath(req);
      this.processRequest(path, this.routingTable && this.routingTable[path], req, res);
    }).listen(this.port, async () => await console.log(`Http Server listening on ${this.port}`))
  }

  async close() {
    this.server.close();
  }

}