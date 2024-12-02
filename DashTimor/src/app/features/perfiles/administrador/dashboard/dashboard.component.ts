import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../../core/services/ventas.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent implements OnInit {

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.obtenerDatosVentas();
  }

  obtenerDatosVentas(): void {
    this.ventasService.obtenerVentas().subscribe({
      next: (data) => this.crearGrafico(data),
      error: (err) => console.error('Error al obtener los datos:', err)
    });
  }

  crearGrafico(data: any[]): void {
    const fechas = data.map(d => d.fecha_venta);
    const montos = data.map(d => d.monto_pagado);

    new Chart('ventasChart', {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Montos Pagados',
            data: montos,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
