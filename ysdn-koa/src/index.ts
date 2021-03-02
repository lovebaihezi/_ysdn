import App from './app';

const StartServer = App();
const port = Number.parseInt(process.env.PORT ?? '8000') ?? 8000;
StartServer(port);
