import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Container } from '../clases/container';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  containers: any[] = [];

  //rutaDeLaColeccion = '/container';
  dbContainersRef: AngularFirestoreCollection<Container>;

  constructor(private bd: AngularFirestore) {
    this.dbContainersRef = bd.collection('container');

    this.dbContainersRef.valueChanges().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.containers.push(element);
      });
    });
  }

  public CrearContainer(con: Container): any {
    return this.dbContainersRef.add({ ...con });
  }

  public getContainers() {
    return this.dbContainersRef;
  }

  public modificarContainer(id:string,data:any) : any
  {
     return this.dbContainersRef.doc(id).set(data);
  }

   public eliminarContainer(id:string) : any
   {
      return this.dbContainersRef.doc(id).delete();
   }


  public getAll() {
    return this.containers;
  }
}
