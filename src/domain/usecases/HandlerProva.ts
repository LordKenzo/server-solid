import { Handler } from '@/domain/usecases/handler';
import { Server } from './server';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class HandlerProva extends Handler implements Handler.HandlerRequest {
  async handle(req: any, res: any, prev?: any): Promise<Handler.HandlerPayload> {
    
    return {
      err: null,
      payload: {
        status: Server.HTTP_STATUS_CODES.OK,
        data: 'Hello World!'
      }
    }
  }
}