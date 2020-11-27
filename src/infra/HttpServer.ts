import { Server } from '@/domain/usecases/server';
import { createServer, Server as NodeServer} from "http";

export class HttpServer implements Server.HttpServer {
  
  private server: NodeServer;
  constructor(public port: number) {
    this.server = new NodeServer();
  }

  async listen() {
    this.server = createServer().listen(this.port, async () => await console.log(`Server listening on ${this.port}`))
  }

  async close() {
    this.server.close();
  }
}