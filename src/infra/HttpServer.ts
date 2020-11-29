import { HTTPValues } from '@/domain/common/httpCommonValues';
import { Handler } from '@/domain/usecases/Handler';
import { HandlerCiao } from '@/domain/usecases/HandlerCiao';
import { HandlerMessage } from '@/domain/usecases/HandlerMessage';
import { HttpRouter } from '@/domain/usecases/router';
import { Utils } from '@/utils/Utils';
import { createServer, Server as NodeServer} from "http";
import { AxiosAdapter } from './AxiosAdapter';
import { BaseServer } from './BaseServer';

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
    handler: [new HandlerMessage(new AxiosAdapter())],
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