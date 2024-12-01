import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosFilterPipe } from '../../../../core/pipes/usuarios-filter.pipe';
import { ServicioAdminService } from '../../../../core/services/servicio-admin.service';
import { UsuariosTimor } from '../../../../core/interfaces/usuarios-timor';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, UsuariosFilterPipe, CommonModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styles: ``
})
export default class UsuariosComponent implements OnInit{
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  usuarioTitle!:string
  dataSource:any=[];
  constructor(public usuariostimor:ServicioAdminService){}
 
  showImage():void{
    this.muestraImg=!this.muestraImg;
  }
 
  usuarios:UsuariosTimor[]=[
    {
      idUsr:1,
      nombre:'Pedro Lopez',
      correo: 'pedro@gmail.com',
      contrasena: '123',
      foto: '',
      perfil: 1,
      activo: 1,
 
    },
    {
      idUsr:2,
      nombre:'Paulina Muñoz',
      correo: 'paulina@gmail.com',
      contrasena: '123',
      foto: '',
      perfil: 3,
      activo: 1,
    },
  ]
 
  onCalificaClick(message:string){
    this.usuarioTitle=` ${message}`;
 
  }
  ngOnInit(): void {
     this.usuariostimor.getUsuarios().subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
 
    },
    error: error=>console.log(error)
  }
    );
 
}

}
