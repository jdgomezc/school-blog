declare global {
  interface Route {
    name: string;
    route: string;
  }

  interface Contact {
    name: string;
    link: string;
    Icon: ((_props: Props) => any) & ImageMetadata;
    label: string;
  }
}

export {};
