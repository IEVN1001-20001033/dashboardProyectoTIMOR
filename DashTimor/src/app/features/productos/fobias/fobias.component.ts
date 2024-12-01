import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FobiaService } from '../../../core/services/fobia.service';
import { FobiaTimor } from '../../../core/interfaces/fobia-timor';
import { FobiafilterPipe } from '../../../core/pipes/fobiafilter.pipe';

@Component({
  selector: 'app-fobias',
  standalone: true,
  imports: [FormsModule, FobiafilterPipe, CommonModule, RouterLink],
  templateUrl: './fobias.component.html',
  styles: ``
})
export default class FobiasComponent implements OnInit{
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  fobiaTitle!:string
  dataSource:any=[];
  constructor(public fobiaTimor:FobiaService){}
 
  showImage():void{
    this.muestraImg=!this.muestraImg;
  }
 
  fobiasIric:FobiaTimor[]=[
    {
      idFobia:1,
      nombre:'Aracnofobia',
      descripcion: 'fobia',
      foto: '',
      precio: '',
      activa: 1,
 
    },
  ]
 
  onCalificaClick(message:string){
    this.fobiaTitle=` ${message}`;
 
  }
  ngOnInit(): void {
     this.fobiaTimor.getFobias().subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
 
    },
    error: error=>console.log(error)
  }
    );
 
}

}
