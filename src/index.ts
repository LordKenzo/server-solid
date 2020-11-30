import { App } from "./App";

const server = App.createConnectHttpServer();
const app = new App(server);

app.launch();
