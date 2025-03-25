declare global {
  interface Route {
    name: string;
    route: string;
  }

  interface Author {
    name: string;
    surname: string;
    role: string;
    image: string;
  }

  interface Post {
    id: string;
    title: string;
    description: string;
    date: Date;
    type: 'POST' | 'ANNOUNCEMENT' | 'MEETING' | 'SCHEDULE';
    file_url: string;
    file_download_url: string;
    author: Author;
  }
}

export {};
