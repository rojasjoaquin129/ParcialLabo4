import { Component, Input, OnInit } from '@angular/core';
import { ContainerService } from 'src/app/services/container.service';
import { take } from 'rxjs/operators';
import { Container } from 'src/app/clases/container';

@Component({
  selector: 'app-modificacion-container',
  templateUrl: './modificacion-container.component.html',
  styleUrls: ['./modificacion-container.component.scss']
})
export class ModificacionContainerComponent implements OnInit {

  codigo!: number;
  marca!: string;
  capacidad!: number;

  @Input() container: Container = new Container;

  constructor(private containerSvc : ContainerService)
  { }

  ngOnInit(): void {

  }

  modificarContainer()
  {
    console.log(this.container);
    this.containerSvc.getContainers().snapshotChanges().pipe(take(1)).subscribe(list=>{
      list.forEach((response):any =>{
        console.log("hola");
        let container = response.payload.doc.data();
          let id = response.payload.doc.id;
          if(container.codigo == this.container.codigo)
          {
            this.containerSvc.modificarContainer(id,JSON.parse(JSON.stringify(this.container)));
          }
      });
    });
  }

}
