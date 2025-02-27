import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { VentasService } from '../../../../../core/services/ventas.service';

@Component({
  selector: 'app-barras',
  standalone: true,
  imports: [],
  templateUrl: './barras.component.html',
  styleUrl: './barras.component.css'
})
export default class BarrasComponent implements OnInit {
  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.ventasService.obtenerVentasFobias().subscribe(
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
    new Chart('barrasChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas Mensuales por Fobia',
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
            text: 'Ventas Mensuales'
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
