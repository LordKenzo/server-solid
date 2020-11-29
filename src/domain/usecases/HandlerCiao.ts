import { Server } from '@/domain/usecases/server';
import { HTTPValues } from '../common/httpCommonValues';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class HandlerCiao implements Server.HandlerRequest {
  async handle(req: any, res: any, prev?: any): Promise<Server.HandlerPayload> {
    let data;
    const resPrev = await prev;
    if(resPrev) {
      data = resPrev.payload.data
    }
    return {
      err: null,
      payload: {
        status: HTTPValues.HTTP_STATUS_CODES.OK,
        data: `${data} - Ciao Mondo!!!`
      }
    }
  }
}