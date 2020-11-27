import { Server } from '@/domain/usecases/server';
import { createServer, IncomingMessage, Server as NodeServer} from "http";

export class HttpServer implements Server.HttpServer {
  
  private server: NodeServer;
  constructor(public port: number) {
    this.server = new NodeServer();
  }

  async listen(request: Server.HandlerRequest) {
    this.server = createServer((req, res) => {
      request.handle(req, res);
     
    }).listen(this.port, async () => await console.log(`Http Server listening on ${this.port}`))
  }

  async close() {
    this.server.close();
  }
}