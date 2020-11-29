import { HTTPValues } from "../common/httpCommonValues";

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

  export interface HandlerRequest {
    handle: (request: IncomingRequest, response: OutgoingResponse, prev?: any) => Promise<HandlerPayload>;
  }

  export type HandlerPayload = {
    err: HandlerError | null,
    payload: {
      status: HTTPValues.HTTP_STATUS_CODES,
      data: any
    } | null
  } | Promise<{
    err: HandlerError | null,
    payload: {
      status: HTTPValues.HTTP_STATUS_CODES,
      data: any
    }  
  }>

  export type HandlerError = {
    error: string,
    code: HTTPValues.HTTP_STATUS_CODES
  }

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