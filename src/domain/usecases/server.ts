export class  Server {
  
  constructor(private httpServer: Server.HttpServer) {}

  start(req: Server.HandlerRequest) {
    this.httpServer.listen(req);
  }
  
  stop() {
    this.httpServer.close();
  }
}

export namespace Server {
  
  export interface HttpServer {
    port: number;
    listen: (req: HandlerRequest) => void;
    close: () => void;
  }

  export interface HandlerRequest {
    handle: (request: any, response: any) => void;
  }
}



/*export interface Server {
  receive: (req: Server.IncomingRequest) => Server.OutgoingResponse
}

namespace Server {
  export interface IncomingRequest {
    endpoint: string,
    verb: string
    payload: any
  }

  export interface OutgoingResponse {
    data: {
      status: number,
      messagge: string
    }
  }
}*/