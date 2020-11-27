import { Server } from "@/domain/usecases/server";
import { HttpServer } from "@/infra/HttpServer";
import { ExpressHttpServer } from "@/infra/ExpressServer";
import { Handler } from "./domain/usecases/Handler";


const httpServer =  new HttpServer(8080);

const server = new Server(httpServer);
const request: Server.HandlerRequest = new Handler();
server.start(request);