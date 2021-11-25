import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from 'src/app/clases/pais';
import { ApiService } from 'src/app/services/api.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../clases/producto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent implements OnInit {

  codigo: string='';
  descripcion: string='';
  precio: string='';
  stock: number=0;
  paisOrigen: string='';
  comestible: boolean=false;
  pais?: Pais;
  nombre: any;
  public formProducto: FormGroup;
  hizoClick:boolean=false;

  basePath = '/images';
  downloadableURL = '';

  constructor(private api: ApiService,
              private productoService: ProductosService,
              private fb:FormBuilder,
              private fireStorage: AngularFireStorage) {
                this.formProducto = this.fb.group(
                  {
                  'codigo': ['',  Validators.required],
                  'descripcion': ['', Validators.required],
                  'precio': ['',  Validators.required],
                  'stock': ['', Validators.required],
                  'paisOrigen': ['', Validators.required],
                  'comestible': ['', Validators.required],
                  });
              }

  ngOnInit(): void {

  }

  guardarProducto() {
    this.hizoClick=true;
    if(this.formProducto.valid){
      //let producto = new Producto(this.descripcion, this.precio, this.stock, this.paisOrigen, this.comestible);
      let producto = new Producto(this.formProducto.get('descripcion')?.value, this.formProducto.get('precio')?.value, this.formProducto.get('stock')?.value, this.formProducto.get('paisOrigen')?.value, this.formProducto.get('comestible')?.value,this.formProducto.get('codigo')?.value);
      this.productoService.guardarProducto(producto).then(resp => {
        Swal.fire({
          title:'Producto guardado',
          text:'El producto se guardó correctamente ',
          icon:'success',
          confirmButtonText:'Cerrar'
        });
        this.formProducto.reset();
      }).catch((error) => {
        Swal.fire({
          title:'Error',
          text:'Error al guardar el producto: '+error,
          icon:'error',
          confirmButtonText:'Cerrar'
        });
      });
    }
    else{
    }
  }

  /*cambiarPais(paisNombre:string){
    this.paisOrigen=paisNombre;
  }*/
  cambiarPais(p : any) {
    this.pais = p;
    this.nombre = p.nombre;
    this.formProducto.get('paisOrigen')?.setValue(p.nombre);

    }

}
