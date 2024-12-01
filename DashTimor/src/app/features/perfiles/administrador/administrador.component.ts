import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './administrador.component.html',
  styles: ``
})
export default class AdministradorComponent {

  title = 'Administrador';
}
