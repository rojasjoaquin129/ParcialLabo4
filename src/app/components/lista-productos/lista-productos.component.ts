import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {


  @Input() listadoProductos: Producto[] = [];

  @Output() productoSeleccionado: EventEmitter<any>= new EventEmitter<any>();

  listaProductos: any;

  cantidadProductos!:Number;

  auxPais!:string;

  constructor(private prodSVC: ProductosService) {
    this.prodSVC.getProductos().subscribe(productos =>{
      this.listadoProductos=productos;
      this.cantidadProductos =  this.listadoProductos.length;
  })
 }

  ngOnInit(): void {
  }

  mostrarDetalles(parametroProducto: Producto)
  {
    this.productoSeleccionado.emit(parametroProducto);
  }

}
