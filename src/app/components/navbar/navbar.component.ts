import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  estado_activo:boolean=false;
  mail_usuario?:string |null='';
  esAdmin:boolean=false;;
  user:any;
  constructor(private authSv: AuthService, private router: Router,public authFire: AngularFireAuth) {
    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
        this.mail_usuario = res.email;
        this.estado_activo = true;

        if(this.mail_usuario == 'admin@mail.com'){
          this.esAdmin = true;
        }
        console.log('User log -> ', this.mail_usuario);
      } else {
        this.estado_activo = false;
        this.esAdmin = false;
        console.log(' No hay usuario logueado ');
      }
    });
  }


  ngOnInit(): void {
    /*this.authSv.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if(this.user){
          this.estado_activo = true;
          this.mail_usuario='sofia@sofia';
        }
        else{ this.estado_activo = false;
          this.mail_usuario='';
        }

      },
      err => console.log(err)
    );*/
  }

  async cerrarSesion(){
    try {
      await this.authSv.logout();
      this.estado_activo = false;
    } catch (error) {
      console.log("Error al cerrar sesion" + error);
    }
  }

}
