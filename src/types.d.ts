declare global {
  interface Route {
    name: string;
    route: string;
  }

  interface Author {
    id: string;
    name: string;
    role: string;
    image: string;
  }
}

export {};
