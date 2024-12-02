import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioAdminService } from '../../../core/services/servicio-admin.service';
import { UsuariosTimor } from '../../../core/interfaces/usuarios-timor';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styles: ``
})
export default class RegistrarComponent implements OnInit {
  registroForm!: FormGroup;

  regUsr: UsuariosTimor = {
    idUsr: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    foto: '/static/uploads/usuario.png',
    perfil: 2,
    activo: 1,
  }
  constructor(private fb: FormBuilder, public usuariostimor: ServicioAdminService, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.initForm();

  }

  initForm(): FormGroup {
    return this.fb.group({
      idUsr: [0],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      foto: ['/static/uploads/usuario.png'],
      perfil: [2],
      activo: [1],
    })

  }


  onSubmit(): void {
    const { idUsr, nombre, correo, contrasena, perfil, activo } = this.registroForm.value;

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

    this.registroForm.reset({
      idUsr: 0,
      nombre: '',
      correo: '',
      contrasena: '',
      foto: '/static/uploads/usuario.png',
      perfil: 2,
      activo: 1
    });
    this.regUsr = {
      idUsr: 0,
      nombre: '',
      correo: '',
      contrasena: '',
      foto: '/static/uploads/usuario.png',
      perfil: 2,
      activo: 1
    };
  }

}
