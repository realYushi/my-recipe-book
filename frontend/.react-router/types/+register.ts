import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/auth/login": {};
  "/ingredients": {};
  "/ingredients/:id": {
    "id": string;
  };
};