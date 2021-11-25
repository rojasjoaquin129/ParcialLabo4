export class Producto {
  codigo: string;
  descripcion: string;
  precio: string;
  stock: number;
  paisOrigen: any;
  comestible: boolean;

  constructor(descripcion: string, precio: string, stock: number, paisOrigen: any, comestible: boolean, codigo:string) {
      this.descripcion = descripcion;
      this.precio = precio;
      this.stock = stock;
      this.paisOrigen = paisOrigen;
      this.comestible = comestible;
      this.codigo=codigo;
  }
}

