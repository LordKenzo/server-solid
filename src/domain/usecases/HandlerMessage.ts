import { Server } from '@/domain/usecases/server';
import { HTTPValues } from '../common/httpCommonValues';

export class HandlerMessage implements Server.HandlerRequest {
  async handle(req: any, res: any, prev?: any): Promise<Server.HandlerPayload> {
    const body = await this.getBody(req);
    console.log(body);
    return {
      err: null,
      payload: {
        status: HTTPValues.HTTP_STATUS_CODES.OK,
        data:  await body
      }
    }
  }

  private async getBody<T>(req: any): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (data: string) => {
        body += data;
      });
      req.on('end', () => {
        try {
          console.log('FATTO')
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      req.on('error', (err: any) => {
        reject(err)
      });
    });
  }
}