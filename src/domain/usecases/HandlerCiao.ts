import { Handler } from '@/domain/usecases/handler';
import { Server } from './server';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class HandlerCiao extends Handler implements Handler.HandlerRequest {
  async handle(req: any, res: any, prev?: any): Promise<Handler.HandlerPayload> {
    let data;
    const resPrev = await prev;
    if(resPrev) {
      data = resPrev.payload.data
    }
    return {
      err: null,
      payload: {
        status: Server.HTTP_STATUS_CODES.OK,
        data: `${data} - Ciao Mondo!!!`
      }
    }
  }
}