// types.d.ts

declare global {
  interface PostAPublicar {
    texto: string;
    imagenUrl: string;
    pdfUri: string;
    pdfDescarga: string;
    tipoPublicacion: 'POST' | 'ANNOUNCEMENT' | 'MEETING' | 'SCHEDULE';
  }
}

export {};
