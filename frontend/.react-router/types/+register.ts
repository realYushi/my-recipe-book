import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/app/auth/login": {};
  "/app/ingredients": {};
  "/app/ingredients/:id": {
    "id": string;
  };
  "/app/recipes": {};
  "/app/recipes/:id": {
    "id": string;
  };
  "/app/dashboard": {};
};