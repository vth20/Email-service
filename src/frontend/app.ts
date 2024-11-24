import configs from "config";
import { Application, oakCors } from "deps";
import log from "logger";
import router from "router";

// load config env
const { env, url, clientUrl, port } = configs;

const corsOptions = {
  origin: env === "development" ? "*" : clientUrl,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

console.log(corsOptions);
const app: Application = new Application();

app.use(oakCors(corsOptions));

app.addEventListener("listen", () => {
  log.info(`Current Environment: ${env}`);
  log.info(`Server listening at ${url}`);
});

// load router in app
router.init(app);

if (import.meta.main) {
  await app.listen({ port });
}

export { app };
