import { PagoPAApi } from '@/data/PagoPAAPI';
import { Handler } from '@/domain/usecases/handler';
import { Server } from './server';

export class HandlerMessage extends Handler implements Handler.HandlerRequest {

  constructor(private apiRequest: PagoPAApi) {
    super();
  }

  async handle(req: any, res: any, prev?: any): Promise<Handler.HandlerPayload> {
    const body: any = await this.getBody(req);
    return new Promise(async (resolve, reject)=> {
      try {
        const result = await this.apiRequest.getProfile({fiscal_code : body.fiscal_code});
        if(result && result.sender_allowed) {
          const  result = await this.apiRequest.postRequest(body);
          resolve({err: null, payload: {data: result, status: Server.HTTP_STATUS_CODES.OK}});
        } else {
          reject({err: result, payload: null});
        }
      } catch(err) {
        reject({err: err, payload: null});
      }
    });
  }

}