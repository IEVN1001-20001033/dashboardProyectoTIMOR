import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SuscripcionesService } from '../../../../../core/services/suscripciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pastel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pastel.component.html',
  styleUrl: './pastel.component.css'
})
export default class PastelComponent implements OnInit {
  meses = [
    { id: 1, name: 'Enero' },
    { id: 2, name: 'Febrero' },
    { id: 3, name: 'Marzo' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' },
    { id: 6, name: 'Junio' },
    { id: 7, name: 'Julio' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' },
    { id: 10, name: 'Octubre' },
    { id: 11, name: 'Noviembre' },
    { id: 12, name: 'Diciembre' },
  ];

  selectedMonth: number = 0;

  constructor(private suscripcionesService: SuscripcionesService) {}

  ngOnInit(): void {
    this.obtenerDatosSuscripciones();
  }

  obtenerDatosSuscripciones(): void {
    this.suscripcionesService.getSuscripcionesPorFobia(this.selectedMonth).subscribe({
      next: (data) => this.crearGrafico(data),
      error: (err) => console.error('Error al obtener los datos:', err),
    });
  }

  crearGrafico(data: any[]): void {
    const fobias = data.map((d) => `Fobia ${d.idFobia}`);
    const totales = data.map((d) => d.total);

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: fobias,
        datasets: [
          {
            data: totales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    this.obtenerDatosSuscripciones();
  }
}
