import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FobiaService } from '../../../core/services/fobia.service';
import { FobiaTimor } from '../../../core/interfaces/fobia-timor';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './eliminar.component.html',
  styles: ``
})
export default class EliminarComponent {
  dataSource:any=[];
  tem:any;
  regFobia:FobiaTimor={
    idFobia:0,
    foto:'',
    nombre:'',
    descripcion:'',
    precio: '',
    activa: 0,

  }
  constructor(private location: Location,public fobiaTimor: FobiaService, private router:Router){}
 
 
  ngOnInit(){
    this.tem = this.location.path().split('/')
    console.log("componente "+this.tem[3])
    this.fobiaTimor.getFobia(parseInt(this.tem[3])).subscribe(
      {
        next: response=>{
 
      this.dataSource=response;
          console.log(this.dataSource)
          this.asignaCampos(this.dataSource)
 
    },
    error: error=>console.log(error)
  }
    );
  }
 
  asignaCampos(dataSource:any){
    this.regFobia.idFobia=dataSource.fobia.idFobia
    this.regFobia.nombre=dataSource.fobia.nombre
    this.regFobia.foto=dataSource.fobia.foto
    this.regFobia.descripcion=dataSource.fobia.descripcion
    this.regFobia.precio=dataSource.fobia.precio
    this.regFobia.activa=dataSource.fobia.activa
    console.log(dataSource.fobia.idFobia)
 }
 
 
 eliminar(){
  console.log("funcion: "+this.tem[3])
  this.fobiaTimor.EliminarFobia(this.tem[3]).subscribe({
    next:()=>{this.router.navigate(['/perfiles/admin/listafobias'])},
    error:(e)=> console.error(e),
    complete:()=>console.info()})
 
    //this.router.navigate(['/administrador/listafobias'])
 
}
}
