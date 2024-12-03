import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-desarrollador',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './desarrollador.component.html',
  styles: ``
})
export default class DesarrolladorComponent implements OnInit{

  title = 'Desarrollador';
  nombre!: string;
  foto!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { nombre: string; foto: string };

    if (state) {
      this.nombre = state.nombre;
      this.foto = state.foto;
    } else {
      const user = this.authService.getUser();
      if (user) {
        this.nombre = user.nombre;
        this.foto = user.foto;
      }
    }
  }
}
