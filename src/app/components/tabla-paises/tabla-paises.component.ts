import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pais } from 'src/app/clases/pais';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss']
})
export class TablaPaisesComponent implements OnInit {

  @Output() seSeleccionoPais: EventEmitter<any> = new EventEmitter<any>();

  mostrar:boolean=false;
  public listaPaises: Pais[] = []

  public bandera: string='';


  constructor(private apiService: ApiService) { }


  ngOnInit(): void {

    let name: string;
    let bandera: string;
    let capital:string;
    let poblacion:number;
    let nombreNativo:string;
    this.apiService.ObtenerPaises().subscribe((paises: any) => {
      for (let index = 0; index < 10; index++)
      {
        console.log(paises[index]);
        name = paises[index].name.common;
        bandera = paises[index].flags.png;
        capital=paises[index].capital;
        poblacion=paises[index].population;
        nombreNativo=paises[index].name.official;
        this.listaPaises.push(new Pais(name, bandera,nombreNativo,capital,poblacion));
      }
      //this.listaPaises = this.shuffle(this.listaPaises).slice(0, 10);
    });
  }

  SeleccionarPais(pais: Pais) {
     this.mostrar=true;
    this.bandera = pais.bandera;
    this.seSeleccionoPais.emit(pais);
  }

}
