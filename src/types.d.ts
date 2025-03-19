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

  interface Post {
    id: string;
    title: string;
    content: string;
    date: Date;
    type: 'post' | 'announcement' | 'meeting' | 'schedule';
    author: Author;
  }
}

export {};
