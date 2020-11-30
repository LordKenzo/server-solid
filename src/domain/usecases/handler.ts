import { HTTPValues } from "../common/httpCommonValues";

export namespace Handler {
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