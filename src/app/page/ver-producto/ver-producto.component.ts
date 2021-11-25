import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss']
})
export class VerProductoComponent implements OnInit {

  token: any;
  prodSeleccionado!: Producto;
  seleccionado:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  tomarProducto(producto: Producto)
  {
    console.log(producto);
    this.prodSeleccionado=producto;
    this.seleccionado=true;
  }

}
