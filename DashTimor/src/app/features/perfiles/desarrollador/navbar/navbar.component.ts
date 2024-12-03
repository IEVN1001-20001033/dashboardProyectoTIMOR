import { Component, OnInit } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export default class NavbarComponent implements OnInit {
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
