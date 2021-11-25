import { Injectable } from '@angular/core';
import {Producto} from '../clases/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  rutaDeLaColeccion = '/productos';
  referenciaAlaColeccion: AngularFirestoreCollection<Producto>;
  referenciaBD: AngularFirestore;
  productos:Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.referenciaBD = firestore;
    this.referenciaAlaColeccion = firestore.collection(this.rutaDeLaColeccion);
    this.productos = this.referenciaAlaColeccion.valueChanges(this.rutaDeLaColeccion)
    //this.productos = this.firestore.collection("productos").snapshotChanges();
  }

  getProductos() {
    return this.productos;
    //let productos:Observable<any[]> =this.firestore.collection("productos").snapshotChanges();
    //return productos;
  }

  getProducto(key: string) {
    return this.firestore.collection("productos").doc(key).valueChanges();
  }

  public modificarProducto(id:string,data:any) : any
  {
     return this.referenciaAlaColeccion.doc(id).set(data);
  }

  public getContainers() {
    return this.referenciaAlaColeccion;
  }
  guardarProducto(producto: Producto) {
    console.log(producto);
    return this.firestore.collection("productos").add({
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      paisOrigen: producto.paisOrigen,
      comestible: producto.comestible,
      codigo:producto.codigo
    });
}
}
