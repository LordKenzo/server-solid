import { Server } from '@/domain/usecases/server';

export class Handler implements Server.HandlerRequest {
  handle(res: any, req: any){
    console.log(req.method, req.headers);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }
}