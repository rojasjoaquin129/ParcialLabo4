import { Container } from 'src/app/clases/container';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-container',
  templateUrl: './alta-container.component.html',
  styleUrls: ['./alta-container.component.scss']
})
export class AltaContainerComponent implements OnInit {

  hizoClick:boolean=false;
  public formContainer: FormGroup;

  @Output() altaContainer = new EventEmitter<Container>();

  constructor(private fb:FormBuilder,) {
    this.formContainer = this.fb.group(
      {
      'codigo': ['',  Validators.required],
      'marca': ['', Validators.required],
      'capacidad': ['',  Validators.required]
      });
  }

  ngOnInit(): void {

  }

  cargarContainer() {
      this.hizoClick=true;
      if(this.formContainer.valid){
        let cont: Container = new Container();
        cont.codigo = this.formContainer.get('codigo')?.value,
        cont.marca = this.formContainer.get('marca')?.value,
        cont.capacidad = this.formContainer.get('capacidad')?.value,
        this.altaContainer.emit(cont);
    }
  }

}
