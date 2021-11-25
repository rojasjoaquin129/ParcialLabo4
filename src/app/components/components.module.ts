import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TablaPaisesComponent } from './tabla-paises/tabla-paises.component';
import { DetallePaisComponent } from './detalle-pais/detalle-pais.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ModificacionContainerComponent } from './modificacion-container/modificacion-container.component';
import { AltaContainerComponent } from './alta-container/alta-container.component';
import { BajaContainerComponent } from './baja-container/baja-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    TablaPaisesComponent,
    DetallePaisComponent,
    DetalleProductoComponent,
    ListaProductosComponent,
    ModificacionContainerComponent,
    AltaContainerComponent,
    BajaContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    TablaPaisesComponent,
    DetallePaisComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    ModificacionContainerComponent,
    AltaContainerComponent,
    BajaContainerComponent
  ]
})
export class ComponentsModule { }
