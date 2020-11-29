import { App } from "./App";

const server = App.createConnectHttpServer();
const app = new App(server);
// const app = new App(server.createExpressServer());

app.launch();
