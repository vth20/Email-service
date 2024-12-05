import routes from "./routes.config.ts";
import NotFoundPage from "../pages/NotFound/index.tsx";
import Home from "../pages/Home/index.tsx";

const Routers: Types.IRoute[] = [
  {
    key: 1,
    path: routes.HOME,
    component: Home,
    isProtected: true,
    isAdmin: false,
  },
  {
    key: 404,
    path: routes.NOTFOUND,
    component: NotFoundPage,
    isProtected: false,
    isAdmin: false,
  },
];

export default Routers;
