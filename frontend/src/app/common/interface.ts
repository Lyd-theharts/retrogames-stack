export type ApiResponse = Games[]

export interface Games {
  id: number
  titulo: string
  plataforma: string
  precio: number
  imagenUrl: string
}

export interface CartItem extends Games {
  quantity: number;
}

export interface Toast{
  text: string;
  className: string;
}
