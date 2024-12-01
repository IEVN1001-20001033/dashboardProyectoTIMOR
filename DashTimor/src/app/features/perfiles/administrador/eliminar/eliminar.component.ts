import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuariosTimor } from '../../../../core/interfaces/usuarios-timor';
import { ServicioAdminService } from '../../../../core/services/servicio-admin.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './eliminar.component.html',
  styles: ``
})
export default class EliminarUsrComponent implements OnInit {
  dataSource:any=[];
  tem:any;
  regUsuario:UsuariosTimor={
    idUsr:0,
    nombre:'',
    correo:'',
    contrasena:'',
    foto:'',
    perfil: 0,
    activo: 0,

  }
  constructor(private location: Location,public usuariosTimor: ServicioAdminService, private router:Router){}
 
 
  ngOnInit(){
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    this.usuariosTimor.getUsuario(parseInt(this.tem[3])).subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
          console.log(this.dataSource)
          this.asignaCampos(this.dataSource)
 
    },
    error: error=>console.log(error)
  }
    );
  }
 
  asignaCampos(dataSource:any){
    this.regUsuario.idUsr=dataSource.usuario.idUsr
    this.regUsuario.nombre=dataSource.usuario.nombre
    this.regUsuario.correo=dataSource.usuario.correo
    this.regUsuario.contrasena=dataSource.usuario.contrasena
    this.regUsuario.foto=dataSource.usuario.foto
    this.regUsuario.perfil=dataSource.usuario.perfil
    this.regUsuario.activo=dataSource.usuario.activo
    this.regUsuario.correo=dataSource.usuario.correo
    console.log(dataSource.usuario.idUsr)
 }
 
 
 eliminar(){
  console.log("funcion: "+this.tem[3])
  this.usuariosTimor.EliminarUsuario(this.tem[3]).subscribe({
    next:()=>{this.router.navigate(['/perfiles/admin/listausuarios'])},
    error:(e)=> console.error(e),
    complete:()=>console.info()})
 
    //this.router.navigate(['/administrador/listausuarios'])
 
}
}
