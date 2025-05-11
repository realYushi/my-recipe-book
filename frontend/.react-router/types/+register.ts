import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/app/auth/login": {};
  "/app/auth/register": {};
  "/app/ingredients": {};
  "/app/ingredients/:id": {
    "id": string;
  };
  "/app/recipes": {};
  "/app/recipes/:id": {
    "id": string;
  };
  "/app": {};
};