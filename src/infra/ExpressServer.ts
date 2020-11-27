import express from 'express';
import { Server as NodeServer } from "http";
import { Server } from '@/domain/usecases/server';

export class ExpressHttpServer implements Server.HttpServer {
  private server: NodeServer;

  constructor(public port: number) {
    this.server = new NodeServer();
  }

  async listen() {
    this.server = express().listen(this.port, async () => await console.log(`Server listening on ${this.port}`))
  }

  async close() {
    this.server.close();
  }
}