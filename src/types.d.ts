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
    type: PostType;
    file_url: string;
    file_download_url: string;
    file_name: string;
    author: Author;
  }

  type PostType = "POST" | "ANNOUNCEMENT" | "MEETING" | "SCHEDULE";
}

export {};
