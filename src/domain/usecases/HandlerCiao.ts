import { Server } from '@/domain/usecases/server';

/*
Il lavoro dell'Handler è elaborare una richiesta e produrre un risultato da passare al router
*/
export class HandlerCiao implements Server.HandlerRequest {
  handle(req: any, res: any, prev?: any): Server.HandlerPayload {
    let data;
    console.log('PREV', prev)
    if(prev) {
      data = prev.payload.data
    }
    return {
      err: null,
      payload: {
        status: 200,
        data: `${data} - Ciao Mondo!!!`
      }
    }
  }
}