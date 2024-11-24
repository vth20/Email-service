import routes from "./routes.config.ts";
import NotFoundPage from "../pages/NotFound/index.tsx";
const Routers: Types.IRoute[] = [
  {
    key: 404,
    path: routes.NOTFOUND,
    component: NotFoundPage,
    isProtected: true,
    isAdmin: false,
  },
];

export default Routers;
