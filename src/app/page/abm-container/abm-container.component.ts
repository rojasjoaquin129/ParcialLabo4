import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';
import { Container } from 'src/app/clases/container';
import { ContainerService } from 'src/app/services/container.service';


@Component({
  selector: 'app-abm-container',
  templateUrl: './abm-container.component.html',
  styleUrls: ['./abm-container.component.scss']
})
export class AbmContainerComponent implements OnInit {

  listaContainers : Observable<Container[]>;
  container : Container = new Container();


  constructor(private contSvc : ContainerService)
  {
    this.listaContainers = this.contSvc.getContainers().valueChanges();
  }

  NuevoContainer(cont: Container)
  {
    let existe : boolean = false;

    this.listaContainers.pipe(take(1)).subscribe(list=>{
      list.forEach(element=>{

        if(element.codigo == cont.codigo)
        {
          existe = true;
        }

      })

      if(existe != true)
      {
         this.contSvc.CrearContainer(cont);
      }
      else
      {
        console.log('Ya existe');
      }
    })
  }

  tomarContainer(container: Container)
  {
    this.container.codigo = container.codigo;
    this.container.marca = container.marca;
    this.container.capacidad = container.capacidad;
  }

  ngOnInit(): void {
  }
}
