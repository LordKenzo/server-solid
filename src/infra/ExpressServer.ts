import express from 'express';
import { Server as NodeServer } from "http";
import { Server } from '@/domain/usecases/server';

export class ExpressHttpServer implements Server.HttpServer {
  private server: NodeServer;

  constructor(public port: number) {
    this.server = new NodeServer();
  }

  async listen(request: Server.HandlerRequest) {
    const app = express()
    app.use('/', (req, res) => request.handle(req, res));
    this.server = app.listen(this.port, async () => await console.log(`Express Server listening on ${this.port}`));

  }

  async close() {
    this.server.close();
  }
}