import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { UsuariosTimor } from '../../../../core/interfaces/usuarios-timor';
import { ServicioAdminService } from '../../../../core/services/servicio-admin.service';


@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './editar.component.html',
  styles: ``
})
export default class EditarUsrComponent {
  dataSource:any=[];
  formGroup!: FormGroup;
  tem:any;

  regUsr:UsuariosTimor={
    idUsr:0,
    nombre:'',
    correo:'',
    contrasena:'',
    foto:'',
    perfil: 0,
    activo: 0,

  }
  constructor(private fb: FormBuilder,private location: Location,public usuariostimor: ServicioAdminService, private router:Router){}
 
 
  ngOnInit(){
    this.formGroup=this.initForm();
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    this.usuariostimor.getUsuario(parseInt(this.tem[3])).subscribe(
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
  initForm():FormGroup{
    return this.fb.group({
      idUsr: [''],
      nombre: [''],
      correo:[''],
      contrasena: [''],
      foto: [''],
      perfil: [''],
      activo: [''],
  })
 
    }

    subirFoto(event: any) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('foto', file);
    
        this.usuariostimor.subirFoto(formData).subscribe({
          next: (response) => {
            this.regUsr.foto = response.ruta;
            console.log('Imagen subida:', response);
          },
          error: (err) => console.error('Error al subir imagen:', err)
        });
      }
    }
    
 
  asignaCampos(dataSource:any){
    this.regUsr.idUsr=dataSource.usuario.idUsr
    this.regUsr.nombre=dataSource.usuario.nombre
    this.regUsr.correo=dataSource.usuario.correo
    this.regUsr.contrasena=dataSource.usuario.contrasena
    this.regUsr.foto=dataSource.usuario.foto
    this.regUsr.perfil=dataSource.usuario.perfil
    this.regUsr.activo=dataSource.usuario.activo
    
    console.log(dataSource.usuario.idUsr)
 }
 
 modificar(){
  this.usuariostimor.modificarUsuario(this.tem[3],this.regUsr).subscribe({
    next:()=>{ this.router.navigate(['/perfiles/admin/listausuarios']) },
    error:(e)=> console.error(e),
    complete:()=>console.info()})

 
}
 
}
