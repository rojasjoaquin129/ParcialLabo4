import { Producto } from "./producto";


export class Container {
  public codigo!: number;
  public marca!: string;
  public capacidad!: number;
  public stock!: number;
  public producto!: Producto[];
}
