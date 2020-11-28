import { Server } from '@/domain/usecases/server';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class Handler implements Server.HandlerRequest {
  handle(req: any, res: any, prev?: any): Server.HandlerPayload {
    
    return {
      err: null,
      payload: {
        status: 200,
        data: 'Hello World!'
      }
    }
  }
}