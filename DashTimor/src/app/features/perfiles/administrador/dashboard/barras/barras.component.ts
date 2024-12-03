import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SuscripcionesService } from '../../../../../core/services/suscripciones.service';

@Component({
  selector: 'app-barras',
  standalone: true,
  imports: [],
  templateUrl: './barras.component.html',
  styleUrl: './barras.component.css'
})
export default class BarrasComponent implements OnInit {
  constructor(private suscripcionesService: SuscripcionesService) {}

  ngOnInit(): void {
    this.obtenerDatosSuscripciones();
  }

  obtenerDatosSuscripciones(): void {
    this.suscripcionesService.getSuscripcionesPorMes().subscribe({
      next: (data) => this.crearGrafico(data),
      error: (err) => console.error('Error al obtener los datos:', err),
    });
  }

  crearGrafico(data: any[]): void {
    const meses = data.map((d) => `Mes ${d.mes}`);
    const totales = data.map((d) => d.total);

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            label: 'Suscripciones por Mes',
            data: totales,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
