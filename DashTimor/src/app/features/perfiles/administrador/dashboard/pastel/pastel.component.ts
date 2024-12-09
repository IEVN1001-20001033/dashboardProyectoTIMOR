import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VentasService } from '../../../../../core/services/ventas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pastel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pastel.component.html',
  styleUrl: './pastel.component.css'
})
export default class PastelComponent implements OnInit {
  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.ventasService.obtenerFobiasMes().subscribe(
      (data) => {
        const labels = data.map((item: any) => `${item[0]}-${item[1].toString().padStart(2, '0')}`);
        const values = data.map((item: any) => parseFloat(item[2])); 

        this.crearGrafica(labels, values);
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  crearGrafica(labels: string[], values: number[]): void {
    new Chart('pastelChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas Mensuales Fobia por cantidad',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Ventas Mensuales Fobia por Cantidad'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
