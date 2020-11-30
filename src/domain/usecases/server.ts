

export class Server {
  
  constructor(private httpServer: Server.HttpServer) {}

  start() {
    this.httpServer.listen();
  }
  
  stop() {
    this.httpServer.close();
  }
}

export namespace Server {
  
  export interface HttpServer {
    port: number;
    listen: () => void;
    close: () => void;
  }

  

  
  
}