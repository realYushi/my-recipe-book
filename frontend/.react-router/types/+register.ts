import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/": {};
  "/auth/register": {};
  "/auth/login": {};
  "/recipes/create": {};
  "/ingredients/create": {};
  "/profile": {};
};