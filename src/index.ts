import { Server } from "@/domain/usecases/server";
import { ExpressHttpServer } from "@/infra/ExpressServer";


const httpServer =  new ExpressHttpServer(8080);

const server = new Server(httpServer);

server.start();