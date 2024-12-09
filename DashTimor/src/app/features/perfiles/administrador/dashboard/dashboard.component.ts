import { Component, OnInit } from '@angular/core';
import VentasComponent from './ventas/ventas.component';
import BarrasComponent from './barras/barras.component';
import PastelComponent from './pastel/pastel.component';
//import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VentasComponent, BarrasComponent, PastelComponent],
  templateUrl: './dashboard.component.html',  
})
export default class DashboardComponent {

  

}
