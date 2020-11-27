import { Server } from "@/domain/usecases/server";
import { HttpServer } from '@/infra/HttpServer';
import { Handler } from "../Handler";

describe('Server', () => {
  const httpServer =  new HttpServer(8080, {routes: [{
    endpoint: '',
    verb: 'GET',
    handler: new Handler()
  }]});

  test('should be able to listen', async (done) => {
    const server =  await new Server(httpServer);
    const listenSpy =  jest.spyOn(httpServer, 'listen');
    const mockRequest: Server.HandlerRequest = {
      handle(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello World!');
        res.end();
      }
    }
    server.start(mockRequest);
    expect(listenSpy).toHaveBeenCalledTimes(1);
    done();
  });

  afterAll( () => {
    httpServer.close();
  });
});