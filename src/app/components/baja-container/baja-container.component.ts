import { Component, Input, OnInit } from '@angular/core';
import { Container } from 'src/app/clases/container';
import { ContainerService } from 'src/app/services/container.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-baja-container',
  templateUrl: './baja-container.component.html',
  styleUrls: ['./baja-container.component.scss']
})
export class BajaContainerComponent implements OnInit {

  codigo! : number|null;
  marca!: string;
  capacidad!: number|null;

  @Input() container:  Container = new Container;

  constructor(private containerSvc : ContainerService) { }

  ngOnInit(): void {
  }

  eliminarContainer()
  {
    this.containerSvc.getContainers().snapshotChanges().pipe(take(1)).subscribe(list=>{
      list.forEach((response):any =>{
        let container = response.payload.doc.data();
          let id = response.payload.doc.id;

          if(container.codigo == this.container.codigo)
          {
            this.containerSvc.eliminarContainer(id);
            this.codigo=null;
            this.marca="";
            this.capacidad=null;
          }
      })
    })
  }
}
