import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  registro = false;
  loginFrom:FormGroup;
  public email=new FormControl('',[Validators.required,Validators.email]);
  public password=new FormControl('',[Validators.required,Validators.minLength(6)]);
  constructor(
    private formB:FormBuilder,
    private route: Router,
    private authService: AuthService,
    private db: AngularFirestore,
    private api: ApiService
    ) {
      this.loginFrom=this.formB.group({
        email:this.email,
        password:this.password
      });
      this.loginFrom.reset();
      this.api.ObtenerPaises().subscribe((paises:any)=>{console.log(paises)}, error=>{console.log(error)});
     }

  ngOnInit(): void {
  }

  Ingresar() {

    console.log(this.usuario);
    const{email,password}=this.loginFrom.value;
    this.usuario.email=email;
    this.usuario.pass=password;
    this.authService.signIn(this.usuario).then(res => {
      console.log('Login exitoso', res);

      this.db.collection('pruebas').add({
          email: this.usuario.email,
          fechaacceso: new Date().toLocaleDateString(),
          dato: 'dato de prueba'
      })
      .then(docRef => {
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.route.navigate(['home']);
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
          console.error('Error adding document: ', error);
      });
    }).catch(error => {
      this.mensajeError('El usuario no esta Autenticado ni en la base de datos ');
     this.loginFrom.reset();
    });
  }
  admin(){

    this.loginFrom.setValue({
     email: "admin@mail.com",
     password:"123456"
    });
  }
  empleado(){
    this.loginFrom.setValue({
      email: "empleado@mail.com",
      password:"123456"
     });
  }
  mensajeError(texto: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:texto,
    });
  }
}
