import { Server } from '@/domain/usecases/server';

export class Handler implements Server.HandlerRequest {
  handle(req: any, res: any){
    // console.log(req, res);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }
}