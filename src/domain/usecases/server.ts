

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

  export enum HTTP_STATUS_CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
  }

  export enum HTTP_VERBS {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATH = 'PATCH',
    OPTIONS = 'OPTIONS'
  }
  
}