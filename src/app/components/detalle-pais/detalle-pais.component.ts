import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle-pais',
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnInit {

  @Input() productoRecibido!:Producto;

  nombre!:string;
  capital!:string;
  poblacion!:number;
  bandera!:any;
  nombreNativo!:string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    console.log(this.productoRecibido.paisOrigen);
    console.log("producto entero::");
    console.log(this.productoRecibido);
    this.apiService.ObtenerPaisPorNombre(this.productoRecibido.paisOrigen).subscribe((pais: any) => {
      for (let index = 0; index < 10; index++)
      {
        console.log(pais[index]);
        this.nombre = pais[index].name.common;
        this.bandera = pais[index].flags.png;
        this.capital=pais[index].capital;
        this.poblacion=pais[index].population;
        this.nombreNativo=pais[index].name.official;
      }
    });
  }

}
