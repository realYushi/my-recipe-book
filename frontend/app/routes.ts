
import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";


export default [
    route("/", "./pages/index.tsx"),
    route("/auth/register", "./pages/auth/register.tsx"),
] satisfies RouteConfig;