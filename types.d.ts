// types.d.ts

declare global {
  interface PostAPublicar {
    title: string;
    description: string;
    file_url: string;
    file_download_url: string;
    type: 'POST' | 'ANNOUNCEMENT' | 'MEETING' | 'SCHEDULE';
    file_name: string;
  }

  type PostType = 'POST' | 'ANNOUNCEMENT' | 'MEETING' | 'SCHEDULE';
}

export {};
