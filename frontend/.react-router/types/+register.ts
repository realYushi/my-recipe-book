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
  "/profile": {};
  "/recipes/create": {};
  "/ingredients/create": {};
};