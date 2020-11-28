import { Server } from '@/domain/usecases/server';
import { HTTPValues } from '../common/httpCommonValues';

export class HandlerMessage implements Server.HandlerRequest {
  handle(req: any, res: any, prev?: any): Server.HandlerPayload {
    
    return {
      err: null,
      payload: {
        status: HTTPValues.HTTP_STATUS_CODES.OK,
        data: 'Hello Message!'
      }
    }
  }
}