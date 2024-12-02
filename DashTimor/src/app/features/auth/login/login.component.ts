import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})

export default class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;
      console.log('Formulario enviado:', this.loginForm.value);
      
      this.authService.login(correo, contrasena).subscribe({
        next:(response) => {
          if(response.exito){
            const { perfil, nombre, foto } = response.usuario;
            this.authService.setUser(response.usuario);

            if (perfil === 1) {
              this.router.navigate(['/perfiles/admin'], { state: { nombre, foto } });
            } else if (perfil === 2) {
              this.router.navigate(['/perfiles/cliente'], { state: { nombre, foto } });
            } else if (perfil === 3) {
              this.router.navigate(['/perfiles/desarrollador'], { state: { nombre, foto } });
            }
          }else{
            alert(response.mensaje);
          }
        },
        error: (err) => console.error(err),
      });
    }else{
      console.log('Formulario inválido');
    }
  }
}