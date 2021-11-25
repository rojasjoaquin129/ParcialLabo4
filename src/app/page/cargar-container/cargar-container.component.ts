import { Container } from 'src/app/clases/container';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerService } from 'src/app/services/container.service';
import { Producto } from 'src/app/clases/producto';
import { take } from 'rxjs/operators';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cargar-container',
  templateUrl: './cargar-container.component.html',
  styleUrls: ['./cargar-container.component.scss']
})
export class CargarContainerComponent implements OnInit {
  seleccionoContenedor=false;
  seleccionarProducto=false;
  cantiadad:number=0;
  prodSeleccionado!:Producto
  listaContainers : Observable<Container[]>;
  container! : Container
  constructor(private contSvc : ContainerService ,
                private produSvc:ProductosService) {
    this.listaContainers = this.contSvc.getContainers().valueChanges();
   }

  ngOnInit(): void {
  }

  tomarContainer(container: Container)
  {

    this.seleccionoContenedor=true;
    console.log(container);
    this.container= container
  }

  tomarProducto(producto: Producto)
  {
    this.seleccionarProducto=true;
    console.log(producto);
    this.prodSeleccionado=producto;
    this.mensajeAgregar(producto.stock,this.container.capacidad).then(numero=>{
     this.cantiadad=numero;
     console.log(numero)
     console.log(this.cantiadad);
        this.container.capacidad=this.container.capacidad-this.cantiadad;
        this.prodSeleccionado.stock=this.prodSeleccionado.stock-this.cantiadad;
        const nuevoProducto:Producto={
          stock:this.cantiadad,
          paisOrigen:this.prodSeleccionado.paisOrigen,
          codigo:this.prodSeleccionado.codigo,
          precio:this.prodSeleccionado.precio,
          descripcion:this.prodSeleccionado.descripcion,
          comestible:this.prodSeleccionado.comestible
        }
        this.container.producto.push(nuevoProducto);
        this.modificarContainer(this.container);
        this.modificarProducto(this.prodSeleccionado);

    })


  }


  async mensajeAgregar(productoMaximo:number,contenedorMaximo:number){
    const { value: numero } = await Swal.fire({
      title: 'Input email address',
      input: 'number',
      inputLabel: 'ingrese cantidad',
      inputPlaceholder: 'Enter your email address'
    })

    if (numero) {
      Swal.fire(`Entered email: ${numero}`)
      return numero;
    }
  }



  modificarContainer(objeto:Container)
  {
    console.log(objeto);
    this.contSvc.getContainers().snapshotChanges().pipe(take(1)).subscribe(list=>{
      list.forEach((response):any =>{
        console.log("hola");
        let container = response.payload.doc.data();
          let id = response.payload.doc.id;
          if(container.codigo == objeto.codigo)
          {
            this.contSvc.modificarContainer(id,JSON.parse(JSON.stringify(objeto)));
          }
      });
    });
  }

  modificarProducto(objeto:Producto)
  {
    console.log(objeto);
    this.produSvc.getContainers().snapshotChanges().pipe(take(1)).subscribe(list=>{
      list.forEach((response):any =>{
        console.log("hola");
        let container = response.payload.doc.data();
          let id = response.payload.doc.id;
          if(container.codigo == objeto.codigo)
          {
            this.produSvc.modificarProducto(id,JSON.parse(JSON.stringify(objeto)));
          }
      });
    });
  }


}
