import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioAdminService } from '../../../../core/services/servicio-admin.service';
import { UsuariosTimor } from '../../../../core/interfaces/usuarios-timor';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.component.html',
  styles: ``
})
export default class AgregarUsrComponent implements OnInit {
  formGroup!: FormGroup;
 
  regUsr:UsuariosTimor={
      idUsr:0,
      nombre: '',
      correo: '',
      contrasena: '',
      foto:'', 
      perfil: 1,
      activo: 1,
  }
  constructor(private fb: FormBuilder,public usuariostimor:ServicioAdminService, private router:Router) { }
 
  ngOnInit(): void {
    this.formGroup=this.initForm();
    
  }
 
  initForm():FormGroup{
    return this.fb.group({
      idUsr:[0],
      nombre: [''],
      correo: [''],
      contrasena: [''],
      foto:[''], 
      perfil: [1],
      activo: [1],
  })
 
    }

    selecImg(event: any): void {
  const img = event.target.files[0];
  if (img) {
    const formData = new FormData();
    formData.append('foto', img);
    this.usuariostimor.subirFoto(formData).subscribe({
      next: (response) => {
        this.regUsr.foto = response.ruta;
        console.log('Imagen subida:', response);
      },
      error: (err) => console.error('Error al subir imagen:', err)
    });
  }
}

onSubmit(): void {
  const { idUsr, nombre, correo, contrasena, perfil, activo } = this.formGroup.value;

  this.regUsr = {
    idUsr,
    nombre,
    correo,
    contrasena,
    foto: this.regUsr.foto, 
    perfil,
    activo
  };
  this.agregar();
}

agregar() {
  const datosUsr = { ...this.regUsr };
  this.usuariostimor.agregarNuevoUsuario(datosUsr).subscribe({
    next: () => this.router.navigate(['/perfiles/admin/listausuarios']),
    error: (err) => console.error('Error al agregar usuario:', err),
    complete: () => console.info('Usuario agregado con éxito')
  });

  this.formGroup.reset({
    idUsr: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    foto: '',
    perfil: 1,
    activo: 1
  });
  this.regUsr = {
    idUsr: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    foto: '',
    perfil: 1,
    activo: 1
  };
}

}
