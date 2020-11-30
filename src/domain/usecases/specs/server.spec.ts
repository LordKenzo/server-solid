import { HTTPValues } from "@/domain/common/httpCommonValues";
import { Server } from "@/domain/usecases/server";
import { HttpServer } from '@/infra/HttpServer';
import { HandlerProva } from "../HandlerProva";

describe('Server', () => {
  const httpServer =  new HttpServer(8080, {routes: [{
    endpoint: '',
    verb:  HTTPValues.HTTP_VERBS.GET,
    handler: new HandlerProva()
  }]});

  test('should be able to listen', async (done) => {
    const server =  await new Server(httpServer);
    const listenSpy =  jest.spyOn(httpServer, 'listen');

    server.start();
    expect(listenSpy).toHaveBeenCalledTimes(1);
    done();
  });

  afterAll( () => {
    httpServer.close();
  });
});