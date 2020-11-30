import { Server } from "./server";

export abstract class Handler {
  protected async getBody<T>(req: any): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (data: string) => {
        body += data;
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', (err: any) => {
        reject(err)
      });
    });
  }
}

export namespace Handler {
  export interface HandlerRequest {
    handle: (request: IncomingRequest, response: OutgoingResponse, prev?: any) => Promise<HandlerPayload>;
  }

  export type HandlerPayload = {
    err: HandlerError | null,
    payload: {
      status: Server.HTTP_STATUS_CODES,
      data: any
    } | null
  } | Promise<{
    err: HandlerError | null,
    payload: {
      status: Server.HTTP_STATUS_CODES,
      data: any
    }  
  }>

  export type HandlerError = {
    title: string,
    message: string,
    status: Server.HTTP_STATUS_CODES
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