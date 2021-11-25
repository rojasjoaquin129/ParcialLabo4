import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './page/bienvenida/bienvenida.component';
import {ErrorComponent} from './page/error/error.component';
import { AbmContainerComponent } from './page/abm-container/abm-container.component';
import { AltaProductoComponent } from './page/alta-producto/alta-producto.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import {LoginComponent} from './page/login/login.component';
import { VerProductoComponent } from './page/ver-producto/ver-producto.component';
import { CargarContainerComponent } from './page/cargar-container/cargar-container.component';
const routes: Routes = [
  {path: 'home', component:BienvenidaComponent},
  {path: 'bienvenidos', component:BienvenidaComponent},
  {path:'altaProducto', component:AltaProductoComponent},
  {path:'login', component:LoginComponent},
  {path:'cargarContainer',component:CargarContainerComponent},
  {path:'verProducto', component: VerProductoComponent, canActivate: [AuthGuardGuard] },
  {path:'abmContainer', component: AbmContainerComponent, canActivate: [AuthGuardGuard] },
  {path:'',component:BienvenidaComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
