import { PagoPAApi } from '@/data/PagoPAAPI';
import { Handler } from '@/domain/usecases/handler';
import { Server } from './server';

export class HandlerAuth extends Handler implements Handler.HandlerRequest {
  constructor(private apiRequest: PagoPAApi) {
    super();
  }
  
  async handle(req: any, res: any, prev?: any): Promise<Handler.HandlerPayload> {
    const body = await this.getBody(req);
    try {
      const result = await this.handlePost(body);
      return {
        err: null,
        payload: {
          status: Server.HTTP_STATUS_CODES.OK,
          data:  await result
        }
      }
    } catch(err) {
      return {
        err: err,
        payload: null
      }
    }
    
  }

  private async handlePost(body: any) {
    return new Promise(async (resolve, reject)=> {
      try {
        const result = await this.apiRequest.getProfile({fiscal_code : body.fiscal_code});
        if(result && result.sender_allowed) {
          resolve(true);
        } else {
          reject({status: result.status, message: result.detail});
        }
      } catch(err) {
        reject({status: Server.HTTP_STATUS_CODES.NOT_FOUND, message: err});
      }
    });
  }


  
}