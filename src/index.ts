import { App } from "./App";

const server = App.createExpressServer();
const app = new App(server);
// const app = new App(server.createExpressServer());

app.launch();
