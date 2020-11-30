import { Server } from '@/domain/usecases/server';
import { HTTPValues } from '../common/httpCommonValues';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class Handler implements Server.HandlerRequest {
  async handle(req: any, res: any, prev?: any): Promise<Server.HandlerPayload> {
    
    return {
      err: null,
      payload: {
        status: HTTPValues.HTTP_STATUS_CODES.OK,
        data: 'Hello World!'
      }
    }
  }
}